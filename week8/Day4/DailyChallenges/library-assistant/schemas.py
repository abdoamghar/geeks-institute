from typing import Literal

from pydantic import BaseModel, ConfigDict


class LibraryResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    book_title: str
    book_id: str | None
    status: Literal["available", "unavailable", "not_found", "error"]
    message: str
