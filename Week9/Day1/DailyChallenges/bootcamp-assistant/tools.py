import atexit
import os
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI, OpenAIError
from qdrant_client import QdrantClient
from qdrant_client.http.exceptions import UnexpectedResponse

from database import save_profile_info, validate_profile


# Load settings before reading the collection name.
load_dotenv(Path(__file__).with_name(".env"))
FAQ_COLLECTION = os.getenv("QDRANT_COLLECTION", "bootcamp_faqs")
qdrant_client = None
qdrant_path = None


def _qdrant():
    # Open Qdrant once and reuse the connection for searches.
    global qdrant_client, qdrant_path
    path = os.getenv("QDRANT_PATH", "./qdrant_bootcamp_data")
    if qdrant_client is None or path != qdrant_path:
        if qdrant_client:
            qdrant_client.close()
        qdrant_client = QdrantClient(path=path)
        qdrant_path = path
    return qdrant_client


def _close_qdrant():
    # Release the local Qdrant database file when the app stops.
    if qdrant_client:
        qdrant_client.close()


atexit.register(_close_qdrant)

# The model can ask Python to run only these two tools.
# A tool schema tells the model the function name and arguments to use.
MODEL_TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_similar_embeddings",
            "description": "Retrieve relevant bootcamp FAQ information.",
            "parameters": {
                "type": "object",
                "properties": {
                    "text": {
                        "type": "string",
                        "description": "The visitor's question.",
                    },
                    "limit": {"type": "integer", "default": 3},
                },
                "required": ["text"],
                "additionalProperties": False,
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "save_profile_info",
            "description": "Save registration details after the visitor confirms them.",
            "parameters": {
                "type": "object",
                "properties": {
                    "full_name": {"type": "string"},
                    "phone": {"type": "string"},
                    "email": {"type": "string"},
                    "age": {"type": "integer"},
                    "level_education": {"type": "string"},
                    "city": {"type": "string"},
                },
                "required": [
                    "full_name",
                    "phone",
                    "email",
                    "age",
                    "level_education",
                    "city",
                ],
                "additionalProperties": False,
            },
            "strict": True,
        },
    },
]


def _client():
    # Make a client for NVIDIA's OpenAI-compatible API.
    return OpenAI(
        api_key=os.getenv("NVIDIA_API_KEY"),
        base_url=os.getenv("BASE_URL"),
        timeout=30,
        max_retries=2,
    )


def get_similar_embeddings(text, limit=3):
    # Check the search text before asking the embedding model.
    if not isinstance(text, str) or not text.strip():
        return {"ok": False, "error": "Search text cannot be empty."}

    # Only allow a small number of search results.
    if isinstance(limit, bool) or not isinstance(limit, int) or not 1 <= limit <= 5:
        return {"ok": False, "error": "Limit must be between 1 and 5."}

    try:
        # Turn the visitor's question into a vector.
        client = _client()
        response = client.embeddings.create(
            model=os.getenv("EMBEDDING_MODEL"),
            input=[text.strip()],
            extra_body={"input_type": "query", "truncate": "END"},
        )
        vector = response.data[0].embedding

        # Find FAQ vectors closest to the question vector.
        results = _qdrant().query_points(
            collection_name=FAQ_COLLECTION,
            query=vector,
            limit=limit,
            with_payload=True,
        ).points

        # Copy the useful FAQ details into a simple list.
        faq_results = []
        for point in results:
            faq = {
                "faq_id": point.payload["faq_id"],
                "question": point.payload["question"],
                "answer": point.payload["answer"],
                "category": point.payload["category"],
                "source_filename": point.payload["source_filename"],
                "score": point.score,
            }
            faq_results.append(faq)

        # An empty list means the search worked but found no FAQ records.
        return {"ok": True, "results": faq_results}
    except (OpenAIError, UnexpectedResponse, ValueError, IndexError):
        # A failed request is different from a successful search with no results.
        return {
            "ok": False,
            "error": "FAQ search failed. Check NVIDIA and Qdrant settings.",
        }


def save_confirmed_profile(profile, confirmed):
    # Do not save until the visitor has confirmed the displayed profile.
    if not confirmed:
        return {"ok": False, "status": "needs_confirmation"}

    # Validate the fields before sending them to MongoDB.
    clean, error = validate_profile(profile)
    if error:
        return {"ok": False, "status": "invalid", "error": error}

    # Save the validated details.
    return save_profile_info(clean)
