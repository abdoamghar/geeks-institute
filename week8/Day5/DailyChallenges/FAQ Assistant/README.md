# FAQ Assistant

This project is a small learning example for a customer-support FAQ assistant.

## What it does
- Reads a customer question.
- Searches the local FAQ dataset using Qdrant and embeddings.
- Uses the OpenAI Python client with the NVIDIA hosted model.
- Returns a clear answer in plain text.

## Files
- `app.py` - main assistant loop
- `ingest.py` - loads the CSV and builds the Qdrant index
- `tools.py` - search tool definition and search function
- `check_connection.py` - quick NVIDIA connection test
- `faq_dataset.csv` - the FAQ knowledge base

## Install
```bash
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

## Setup
1. Copy `.env.example` to `.env`.
2. Add your NVIDIA API key.
3. Keep your `.env` file private.

## Run
```bash
python ingest.py
python app.py
```

## Connection check
```bash
python check_connection.py
```

This is intentionally simple so it is easy for beginners to understand.
