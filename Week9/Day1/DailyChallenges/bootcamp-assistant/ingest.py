import csv
import os
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI
from qdrant_client import QdrantClient, models


# Load settings from the .env file beside this script.
load_dotenv(Path(__file__).with_name(".env"))

REQUIRED_COLUMNS = ["question", "answer", "category"]


def clean_cell(value):
    # Remove extra spaces, quotes, and commas from the supplied CSV.
    value = value.strip()
    value = value.strip('",')
    return value.replace('""', '"').strip()


def read_faqs(csv_path):
    # Read the CSV rows using semicolons between columns.
    with open(csv_path, encoding="utf-8-sig", newline="") as file:
        lines = file.readlines()

    if not lines:
        raise ValueError("The FAQ CSV is empty.")

    header = next(csv.reader([lines[0]], delimiter=";"))
    clean_header = []
    for column in header:
        clean_header.append(clean_cell(column))

    # Check that all required columns exist.
    for column in REQUIRED_COLUMNS:
        if column not in clean_header:
            raise ValueError(f"CSV is missing the {column} column.")

    faqs = []

    # Read and validate each FAQ row.
    for row_number, line in enumerate(lines[1:], start=2):
        if not line.strip():
            continue

        row = next(csv.reader([line], delimiter=";"))

        # A few provided rows have broken quotes, so split those rows by semicolons.
        if len(row) != len(clean_header):
            row = line.rstrip("\r\n").split(";", 2)

        clean_row = []
        for value in row:
            clean_row.append(clean_cell(value))

        if len(clean_row) != len(clean_header):
            raise ValueError(f"CSV row {row_number} does not have three columns.")

        faq = dict(zip(clean_header, clean_row))

        for column in REQUIRED_COLUMNS:
            if not faq[column]:
                raise ValueError(
                    f"CSV row {row_number} has an empty {column} value."
                )

        # Use the FAQ's position in the file as its stable ID.
        faq["faq_id"] = len(faqs) + 1
        faqs.append(faq)

    if not faqs:
        raise ValueError("The FAQ CSV has no data rows.")

    return faqs


def ingest_faqs():
    # Find the FAQ file next to this script.
    csv_path = Path(__file__).with_name("bootcamp_faq.csv")
    faqs = read_faqs(csv_path)

    # Connect to NVIDIA's embedding model.
    client = OpenAI(
        api_key=os.getenv("NVIDIA_API_KEY"),
        base_url=os.getenv("BASE_URL"),
        timeout=30,
        max_retries=2,
    )

    # Combine each FAQ question and answer into one document.
    documents = []
    for faq in faqs:
        document = f"Question: {faq['question']}\nAnswer: {faq['answer']}"
        documents.append(document)

    # Create one embedding for each FAQ document.
    response = client.embeddings.create(
        model=os.getenv("EMBEDDING_MODEL"),
        input=documents,
        extra_body={"input_type": "passage", "truncate": "END"},
    )

    # Keep the embeddings in the same order as the FAQ documents.
    sorted_results = sorted(response.data, key=lambda item: item.index)
    vectors = []
    for result in sorted_results:
        vectors.append(result.embedding)

    if len(vectors) != len(faqs):
        raise ValueError("The embedding service returned the wrong number of vectors.")

    # Get the vector size from the first embedding.
    vector_size = len(vectors[0])

    # Open the local Qdrant database.
    qdrant = QdrantClient(
        path=os.getenv("QDRANT_PATH", "./qdrant_bootcamp_data")
    )
    collection_name = os.getenv("QDRANT_COLLECTION", "bootcamp_faqs")

    # Check whether the collection already exists.
    collections = qdrant.get_collections().collections
    collection_exists = False
    for collection in collections:
        if collection.name == collection_name:
            collection_exists = True

    old_ids = []
    rebuild_collection = False

    if collection_exists:
        info = qdrant.get_collection(collection_name)
        old_points, _ = qdrant.scroll(
            collection_name,
            limit=10000,
            with_payload=True,
        )

        # Remember old FAQ IDs so outdated records can be removed.
        for point in old_points:
            old_ids.append(point.id)

        # Rebuild if the model or vector size has changed.
        old_model = None
        if old_points:
            old_model = old_points[0].payload.get("embedding_model")

        old_size = info.config.params.vectors.size
        if old_model != os.getenv("EMBEDDING_MODEL"):
            rebuild_collection = True
        if old_size != vector_size:
            rebuild_collection = True

    # Create a new collection when needed.
    if not collection_exists or rebuild_collection:
        if collection_exists:
            qdrant.delete_collection(collection_name)

        qdrant.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=vector_size,
                distance=models.Distance.COSINE,
            ),
        )
        old_ids = []

    # Pair every FAQ with its vector and save them in Qdrant.
    points = []
    for faq, vector in zip(faqs, vectors):
        payload = {
            "faq_id": faq["faq_id"],
            "question": faq["question"],
            "answer": faq["answer"],
            "category": faq["category"],
            "source_filename": csv_path.name,
            "embedding_model": os.getenv("EMBEDDING_MODEL"),
        }

        point = models.PointStruct(
            id=faq["faq_id"],
            vector=vector,
            payload=payload,
        )
        points.append(point)

    # Upserting the same IDs makes repeated imports safe.
    qdrant.upsert(
        collection_name=collection_name,
        points=points,
        wait=True,
    )

    # Remove old FAQs that are no longer in the CSV.
    current_ids = []
    for faq in faqs:
        current_ids.append(faq["faq_id"])

    old_ids_to_remove = []
    for faq_id in old_ids:
        if faq_id not in current_ids:
            old_ids_to_remove.append(faq_id)

    if old_ids_to_remove:
        qdrant.delete(
            collection_name=collection_name,
            points_selector=models.PointIdsList(points=old_ids_to_remove),
            wait=True,
        )

    # Close Qdrant and report the import result.
    qdrant.close()
    print(f"Imported {len(faqs)} FAQs ({vector_size} dimensions).")


if __name__ == "__main__":
    ingest_faqs()
