import uuid

from openai import OpenAI
from qdrant_client import QdrantClient
from qdrant_client.http import models

from config import Config


def store_chunks(chunks):
    if not chunks:
        return 0

    if not Config.OPENROUTER_API_KEY or not Config.OPENROUTER_EMBEDDING_MODEL:
        raise ValueError(
            "Set OPENROUTER_API_KEY and OPENROUTER_EMBEDDING_MODEL in the .env file."
        )

    openai_client = OpenAI(
        api_key=Config.OPENROUTER_API_KEY,
        base_url="https://openrouter.ai/api/v1",
    )
    qdrant_client = QdrantClient(path=Config.QDRANT_PATH)
    collection_name = "pdf_chunks"

    try:
        texts = [chunk["text"] for chunk in chunks]
        response = openai_client.embeddings.create(
            model=Config.OPENROUTER_EMBEDDING_MODEL,
            input=texts,
        )
        embeddings = response.data

        if len(embeddings) != len(chunks):
            raise ValueError(
                "The number of embeddings does not match the number of chunks."
            )

        if not qdrant_client.collection_exists(collection_name):
            qdrant_client.create_collection(
                collection_name=collection_name,
                vectors_config=models.VectorParams(
                    size=len(embeddings[0].embedding),
                    distance=models.Distance.COSINE,
                ),
            )

        points = []
        for index, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            # Stable IDs mean running ingestion again updates the same chunks.
            point_id = uuid.uuid5(
                uuid.NAMESPACE_URL,
                f"{chunk['metadata']['page_number']}:{index}:{chunk['text']}",
            )
            points.append(
                models.PointStruct(
                    id=str(point_id),
                    vector=embedding.embedding,
                    payload={
                        "text": chunk["text"],
                        "page_number": chunk["metadata"]["page_number"],
                    },
                )
            )

        qdrant_client.upsert(collection_name=collection_name, points=points)
        return len(points)
    finally:
        openai_client.close()
        qdrant_client.close()


def retrieve_chunks(query, top_k=5):
    if not Config.OPENROUTER_API_KEY or not Config.OPENROUTER_EMBEDDING_MODEL:
        raise ValueError(
            "Set OPENROUTER_API_KEY and OPENROUTER_EMBEDDING_MODEL in the .env file."
        )

    openai_client = OpenAI(
        api_key=Config.OPENROUTER_API_KEY,
        base_url="https://openrouter.ai/api/v1",
    )
    qdrant_client = QdrantClient(path=Config.QDRANT_PATH)
    collection_name = "pdf_chunks"

    try:
        if not qdrant_client.collection_exists(collection_name):
            raise ValueError(
                "The book collection is empty. Run ingest.py before asking book questions."
            )

        response = openai_client.embeddings.create(
            model=Config.OPENROUTER_EMBEDDING_MODEL,
            input=query,
        )
        query_embedding = response.data[0].embedding

        search_result = qdrant_client.query_points(
            collection_name=collection_name,
            query=query_embedding,
            limit=top_k,
            with_payload=True,
        )

        retrieved_chunks = []
        for point in search_result.points:
            retrieved_chunks.append(
                {
                    "text": point.payload["text"],
                    "page_number": point.payload["page_number"],
                    "score": point.score,
                }
            )

        return retrieved_chunks
    finally:
        openai_client.close()
        qdrant_client.close()