import os
from pathlib import Path

from dotenv import load_dotenv

# Read the project settings from the .env file beside this file.
PROJECT_FOLDER = Path(__file__).resolve().parent
load_dotenv(PROJECT_FOLDER / ".env")


class Config:
    # Keep settings in one place so the app and services use the same values.
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
    OPENROUTER_CHAT_MODEL = os.getenv("OPENROUTER_CHAT_MODEL")
    OPENROUTER_EMBEDDING_MODEL = os.getenv("OPENROUTER_EMBEDDING_MODEL")
    MONGODB_URL = os.getenv("MONGODB_URL")

    QDRANT_PATH = os.getenv(
        "QDRANT_PATH",
        str(PROJECT_FOLDER / "qdrant_bootcamp_data"),
    )
    PDF_PATH = os.getenv(
        "PDF_PATH",
        str(PROJECT_FOLDER / "IntroductiontoAgents.pdf"),
    )