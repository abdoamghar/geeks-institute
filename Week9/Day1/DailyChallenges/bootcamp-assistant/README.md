# AI Full-Stack Bootcamp Assistant

A classroom RAG project: FAQs are embedded once and saved in local Qdrant.
When someone asks a question, the app embeds that question, searches Qdrant,
and asks the model to answer using the matching FAQs. Confirmed registration
inquiries are saved in MongoDB.

## Setup

Use Python 3.11 or 3.12. In PowerShell, from this folder:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Add your NVIDIA API key, Flask secret, and MongoDB connection string to `.env`.
Never put real credentials in `.env.example` or commit `.env`.

## Run the project

First check that the NVIDIA chat and embedding models are available:

```powershell
.\.venv\Scripts\python.exe check_connection.py
```

Then prepare the FAQ search index and start the website:

```powershell
.\.venv\Scripts\python.exe ingest.py
.\.venv\Scripts\python.exe app.py
```

Open <http://127.0.0.1:5000>.

## Simple RAG flow

1. `ingest.py` reads FAQs, creates embeddings, and stores them in Qdrant.
2. `tools.py` embeds a visitor question and searches for similar FAQs.
3. `app.py` gives the matching FAQ records to the chat model.
4. The model answers from those records and cites them as `[FAQ 1]`.
5. Registration details are saved only after the visitor confirms them.

Conversation state is stored in memory for this classroom project. Restarting
Flask clears it, and this approach is not suitable for production.

## What each file does

- `check_connection.py` sends one test request to each NVIDIA model.
- `ingest.py` prepares FAQ vectors and saves them in Qdrant.
- `tools.py` searches Qdrant and provides the registration save function.
- `database.py` checks profile details and saves them in MongoDB.
- `app.py` connects the website, chat model, and Python tools.
- `templates/index.html` contains the page structure.
- `static/css/style.css` controls how the page looks.
- `static/js/app.js` sends messages to Flask and displays the replies.

## FAQ data

The supplied file uses semicolons. The importer removes stray quote/comma
characters present in a few source rows, then rejects missing required fields.
Qdrant stores local data in `qdrant_bootcamp_data/`.

## Scope note

Passing `check_connection.py` confirms the two hosted model endpoints only.
It does not prove Qdrant retrieval or tool calling works. Saving a profile
creates a registration inquiry; it does not mean someone is admitted, has paid,
or has reserved a place.