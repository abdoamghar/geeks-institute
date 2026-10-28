import pymupdf
from langchain_text_splitters import RecursiveCharacterTextSplitter

from config import Config
from services.qdrant_service import store_chunks


# Split each PDF page into smaller pieces while keeping its page number.
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=150,
)


def load_chunks(pdf_path=Config.PDF_PATH):
    chunks = []

    with pymupdf.open(pdf_path) as doc:
        for page_number, page in enumerate(doc, start=1):
            text = page.get_text().strip()
            if not text:
                continue

            for chunk in splitter.split_text(text):
                chunks.append({
                    "metadata": {"page_number": page_number},
                    "text": chunk,
                })

    return chunks


if __name__ == "__main__":
    # Run this script after adding a PDF to store its chunks in local Qdrant.
    chunks = load_chunks()
    stored_count = store_chunks(chunks)
    print(f"Stored {stored_count} chunks in Qdrant.")
