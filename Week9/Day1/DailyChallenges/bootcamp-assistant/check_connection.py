import os
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI, OpenAIError


def check_connection():
    # Load the settings from the .env file beside this script.
    load_dotenv(Path(__file__).with_name(".env"))

    # Read the model settings without printing any secret values.
    api_key = os.getenv("NVIDIA_API_KEY")
    base_url = os.getenv("NVIDIA_API_BASE") or os.getenv("BASE_URL")
    chat_model = os.getenv("MODEL")
    embedding_model = os.getenv("EMBEDDING_MODEL")

    # Check the API key first so no request is sent without credentials.
    if not api_key:
        print("Missing NVIDIA_API_KEY in .env.")
        return False

    # All four settings are needed to check both models.
    if not base_url or not chat_model or not embedding_model:
        print("Set BASE_URL, MODEL, and EMBEDDING_MODEL in .env.")
        return False

    # Send a small test request to the chat and embedding models.
    step = "chat"
    try:
        client = OpenAI(
            api_key=api_key,
            base_url=base_url,
            timeout=30,
            max_retries=2,
        )

        # Check that the chat model returns a response.
        chat = client.chat.completions.create(
            model=chat_model,
            messages=[{"role": "user", "content": "Hello!"}],
        )
        if not chat.choices:
            print("Chat request succeeded, but returned no response.")
            return False
        print("Chat:", chat.choices[0].message.content or "No text returned.")

        # Check that the embedding model returns a vector.
        step = "embedding"
        embedding = client.embeddings.create(
            model=embedding_model,
            input="Hello!",
            extra_body={"input_type": "query", "truncate": "END"},
        )
        if not embedding.data:
            print("Embedding request succeeded, but returned no vector.")
            return False
        print("Embedding dimensions:", len(embedding.data[0].embedding))

        # Both endpoints responded successfully.
        return True
    except OpenAIError as error:
        # Show the failing step and error type, but never show the API key.
        print(f"{step.capitalize()} request failed:", type(error).__name__)
        return False


if __name__ == "__main__":
    # Run the connection test when this file is started directly.
    if not check_connection():
        raise SystemExit(1)
