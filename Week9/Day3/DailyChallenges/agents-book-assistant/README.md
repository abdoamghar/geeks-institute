# Book Assistant

A small Flask chat app that can search a PDF using embeddings and a local Qdrant database.

## Setup

1. Activate the virtual environment:

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

2. Copy `.env.example` to `.env` and add your OpenRouter API key, model names, and MongoDB connection URI.
3. Install packages if needed:

   ```powershell
   pip install -r requirements.txt
   ```

## Add the book to Qdrant

Put the PDF at the path set by `PDF_PATH` in `.env` (the default is `IntroductiontoAgents.pdf` in this folder), then run:

```powershell
python ingest.py
```

This extracts text page by page, splits it into chunks, creates embeddings, and saves the chunks in the local Qdrant folder set by `QDRANT_PATH`.

## Start the chat app

```powershell
python app.py
```

Open the local address printed by Flask in your browser. The chat page sends questions to `/chat`; the agent chooses whether to search the book and uses Qdrant results to answer book questions.

Conversation messages are saved in MongoDB under a browser-generated conversation ID. The browser keeps that ID and the optional display name in local storage, so reopening the app in the same browser loads the saved chat. Clearing local storage starts a new conversation. The display name is not an account login, so this prototype does not provide private, authenticated user accounts.

## Project files

- `app.py` creates the Flask app and displays the chat page.
- `config.py` loads settings from `.env`.
- `routes/chat_routes.py` accepts chat messages and returns answers.
- `agents/book_agent.py` asks the LLM whether to search the book.
- `services/qdrant_service.py` stores and searches vectors in local Qdrant.
- `ingest.py` extracts and splits PDF text before storing it.
- `templates/index.html` contains the chat interface.

Keep `.env` private. If an API key has been shared or exposed, revoke it and create a replacement.