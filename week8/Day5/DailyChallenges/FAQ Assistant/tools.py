from typing import Any

from fastembed import TextEmbedding
from qdrant_client import QdrantClient

COLLECTION_NAME = "store_faqs"
QDRANT_PATH = "./qdrant_faq_data"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

MODEL_TOOL_DEFINITION = {
    "type": "function",
    "function": {
        "name": "search_faqs",
        "description": "Search the store FAQ for similar customer questions.",
        "parameters": {
            "type": "object",
            "properties": {
                "question": {
                    "type": "string",
                    "description": "The customer question to search in the FAQ database.",
                },
                "limit": {
                    "type": "integer",
                    "description": "Maximum number of matching FAQ items to return.",
                    "default": 3,
                },
            },
            "required": ["question"],
        },
    },
}


def search_faqs(question: str, limit: int = 3) -> list[dict[str, Any]]:
    if not question or not question.strip():
        return []

    client = QdrantClient(path=QDRANT_PATH)

    if not client.collection_exists(collection_name=COLLECTION_NAME):
        raise FileNotFoundError("FAQ index not found. Run ingest.py first.")

    model = TextEmbedding(model_name=EMBEDDING_MODEL)
    query_vector = list(model.embed([question.strip()]))[0]

    result = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=limit,
        with_payload=True,
        with_vectors=False,
    )

    results = []
    for hit in result.points:
        payload = hit.payload or {}
        results.append(
            {
                "faq_id": payload.get("faq_id"),
                "question": payload.get("question"),
                "answer": payload.get("answer"),
                "category": payload.get("category"),
                "source": payload.get("source"),
                "score": float(getattr(hit, "score", 0.0) or 0.0),
            }
        )

    return results
