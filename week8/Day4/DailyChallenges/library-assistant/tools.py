import json
from pathlib import Path
from typing import Any

DATA_PATH = Path(__file__).with_name("books.json")


def _load_books() -> list[dict[str, Any]]:
    with DATA_PATH.open("r", encoding="utf-8") as book_file:
        books = json.load(book_file)
    if not isinstance(books, list):
        raise ValueError("books.json must contain a list of book objects.")
    return books


def find_book(title: str) -> dict[str, Any]:
    if not isinstance(title, str):
        raise TypeError("The title must be a string.")

    normalized_title = title.strip().lower()
    for book in _load_books():
        book_title = str(book.get("title", "")).strip().lower()
        if book_title == normalized_title:
            return {
                "found": True,
                "book_id": book.get("book_id"),
                "title": book.get("title"),
            }

    return {
        "found": False,
        "book_id": None,
        "title": title.strip(),
    }


def check_availability(book_id: str) -> dict[str, Any]:
    if not isinstance(book_id, str):
        raise TypeError("The book_id must be a string.")

    for book in _load_books():
        if str(book.get("book_id")) == book_id:
            return {
                "book_id": book.get("book_id"),
                "available_copies": int(book.get("available_copies", 0)),
            }

    return {
        "book_id": book_id,
        "available_copies": None,
        "error": "Book not found",
    }
