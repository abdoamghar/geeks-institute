import os

import pymupdf
import qdrant_client
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

embedding_model = os.getenv("OPENROUTER_EMBEDDING_MODEL")
chat_model = os.getenv("OPENROUTER_CHAT_MODEL")
if not os.getenv("OPENROUTER_API_KEY") or not embedding_model or not chat_model:
    raise ValueError(
        "Add OPENROUTER_API_KEY, OPENROUTER_EMBEDDING_MODEL, "
        "and OPENROUTER_CHAT_MODEL to your .env file."
    )

pdf_path = "NovaTech_Company_Overview.pdf"
filename = os.path.basename(pdf_path)
collection_name = "novatech_handbook"

qdrant = qdrant_client.QdrantClient(
    path=os.getenv("QDRANT_PATH", "./qdrant_bootcamp_data")
)


def get_embedding(text, input_type):
    response = client.embeddings.create(
        input=text,
        model=embedding_model,
        extra_body={"input_type": input_type},
    )
    return response.data[0].embedding


def split_into_chunks(text, chunk_size=300, overlap=50):
    words = text.split()
    chunks = []
    start = 0

    while start < len(words):
        chunks.append(" ".join(words[start : start + chunk_size]))
        start += chunk_size - overlap

    return chunks


with pymupdf.open(pdf_path) as document:
    chunk_id = 0

    for page_number, page in enumerate(document, start=1):
        chunks = split_into_chunks(page.get_text())

        for chunk_index, chunk in enumerate(chunks):
            vector = get_embedding(chunk, "passage")

            if not qdrant.collection_exists(collection_name):
                qdrant.create_collection(
                    collection_name=collection_name,
                    vectors_config=qdrant_client.models.VectorParams(
                        size=len(vector),
                        distance=qdrant_client.models.Distance.COSINE,
                    ),
                )

            qdrant.upsert(
                collection_name=collection_name,
                points=[
                    qdrant_client.models.PointStruct(
                        id=chunk_id,
                        vector=vector,
                        payload={
                            "text": chunk,
                            "filename": filename,
                            "page_number": page_number,
                            "chunk_index": chunk_index,
                        },
                    )
                ],
            )
            chunk_id += 1

print(f"Stored {chunk_id} chunks in Qdrant.")

while True:
    question = input("\nAsk a question (or type 'quit'): ")
    if question.lower() == "quit":
        break

    question_vector = get_embedding(question, "query")
    results = qdrant.query_points(
        collection_name=collection_name,
        query=question_vector,
        limit=3,
        with_payload=True,
    ).points

    context = "\n\n".join(
        f"Page {result.payload['page_number']}: {result.payload['text']}"
        for result in results
    )
    response = client.chat.completions.create(
        model=chat_model,
        messages=[
            {
                "role": "system",
                "content": (
                    "Answer using only the document excerpts. Cite a page as "
                    "[Page N] when an excerpt supports the answer. If the excerpts "
                    "do not contain the answer, say the document does not provide "
                    "that information and do not cite unrelated pages."
                ),
            },
            {
                "role": "user",
                "content": f"Document excerpts:\n{context}\n\nQuestion: {question}",
            },
        ],
    )

    print(response.choices[0].message.content)

qdrant.close()
