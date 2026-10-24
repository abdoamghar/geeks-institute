import csv
from pathlib import Path

from dotenv import load_dotenv
from fastembed import TextEmbedding
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams

load_dotenv()

DATA_FILE = Path(__file__).with_name("faq_dataset.csv")
QDRANT_PATH = Path(__file__).with_name("qdrant_faq_data")
COLLECTION_NAME = "store_faqs"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"


def load_faq_rows():
    with DATA_FILE.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file, delimiter=";")

        if reader.fieldnames is None:
            raise ValueError("The FAQ CSV is empty or missing the header row.")

        cleaned_fields = [name.strip() for name in reader.fieldnames]
        reader.fieldnames = cleaned_fields

        required = {"question", "answer", "category"}
        missing = required - set(cleaned_fields)
        if missing:
            raise ValueError(f"Missing required columns: {sorted(missing)}")

        rows = []
        for row_number, row in enumerate(reader, start=1):
            question = (row.get("question") or "").strip()
            answer = (row.get("answer") or "").strip()
            category = (row.get("category") or "").strip()

            if not question or not answer or not category:
                raise ValueError(f"Row {row_number} has missing FAQ values.")

            rows.append(
                {
                    "faq_id": row_number,
                    "question": question,
                    "answer": answer,
                    "category": category,
                    "source": DATA_FILE.name,
                }
            )

    return rows


def build_index():
    faq_rows = load_faq_rows()

    client = QdrantClient(path=str(QDRANT_PATH))
    model = TextEmbedding(model_name=EMBEDDING_MODEL)

    if client.collection_exists(collection_name=COLLECTION_NAME):
        client.delete_collection(collection_name=COLLECTION_NAME)

    client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=384, distance=Distance.COSINE),
    )

    points = []
    for row in faq_rows:
        text = f"{row['question']} {row['answer']}"
        embedding = list(model.embed([text]))[0]

        payload = {
            "faq_id": row["faq_id"],
            "question": row["question"],
            "answer": row["answer"],
            "category": row["category"],
            "source": row["source"],
        }

        points.append(PointStruct(id=row["faq_id"], vector=embedding, payload=payload))

    client.upsert(collection_name=COLLECTION_NAME, points=points)
    print(f"Indexed {len(points)} FAQ items in Qdrant.")
    return len(points)


if __name__ == "__main__":
    build_index()
