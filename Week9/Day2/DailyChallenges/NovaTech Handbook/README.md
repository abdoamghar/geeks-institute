# Chat with the NovaTech Handbook

## Extraction choice

This project uses PyMuPDF because the NovaTech PDF contains selectable text. It extracts each page separately so every stored chunk keeps its filename and page number.

## Setup and run

1. Install Python packages:

   ```powershell
   python -m pip install -r requirements.txt
   ```

2. Copy `.env.example` to `.env` and add your OpenRouter API key. The example uses an OpenRouter embedding model and its free chat router. Do not commit `.env`.
3. Run the application from this folder:

   ```powershell
   python app.py
   ```

The application splits each page into overlapping word chunks, creates embeddings and answers questions through OpenRouter, and stores chunks in local Qdrant. Enter a question when prompted; type `quit` to stop. Answers use the retrieved text and cite source pages. If you already have this Qdrant folder open in a notebook, restart its kernel before running the script.

## Test questions and document answers

1. **What does NovaTech do?** It makes software that helps organizations organize internal information, coordinate service requests, and understand operational performance. **Source: page 2.**
2. **Which department owns the product roadmap?** Product and Design. **Source: page 5.**
3. **What is the main focus of the Paris office?** Commercial discussions, partner relationships, and workshops. **Source: page 9.**
4. **What happens before a document revision is visible to ordinary users?** The responsible owner must approve publication. **Source: page 10.**
5. **What is NovaTech’s employee vacation allowance?** The document does not provide this information. **Source: not stated in the document.**

## Problem encountered

An initial embedding request returned a 404 because it was sent to the wrong API endpoint. I tested both embedding and chat requests through OpenRouter and confirmed they work with the configured models.
