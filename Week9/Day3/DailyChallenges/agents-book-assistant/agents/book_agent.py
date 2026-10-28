import json
import re

from openai import OpenAI

from config import Config
from services.qdrant_service import retrieve_chunks


def get_search_query(answer):
    # Some models write a search request as XML instead of using the tool API.
    match = re.search(
        r"<tool_call>\s*search_book\b.*?"
        r"<arg_key>\s*query\s*</arg_key>\s*"
        r"<arg_value>(.*?)</arg_value>.*?</tool_call>",
        answer,
        flags=re.IGNORECASE | re.DOTALL,
    )
    return match.group(1).strip() if match else None


def answer_question(question, history=None):
    # Ask the model whether it needs to search the book for this question.
    if not Config.OPENROUTER_API_KEY or not Config.OPENROUTER_CHAT_MODEL:
        raise ValueError(
            "Set OPENROUTER_API_KEY and OPENROUTER_CHAT_MODEL in the .env file."
        )

    client = OpenAI(
        api_key=Config.OPENROUTER_API_KEY,
        base_url="https://openrouter.ai/api/v1",
    )
    messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful book assistant. Use the search_book tool "
                "for questions about the book. Base book answers on the returned "
                "passages and mention their page numbers. If the question is not "
                "about the book, answer normally."
            ),
        },
    ]
    # Include recent turns so the model can understand follow-up questions.
    messages.extend((history or [])[-20:])
    messages.append({"role": "user", "content": question})
    tools = [
        {
            "type": "function",
            "function": {
                "name": "search_book",
                "description": "Search the book for passages relevant to a question.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "What to look up in the book.",
                        }
                    },
                    "required": ["query"],
                },
            },
        }
    ]

    try:
        response = client.chat.completions.create(
            model=Config.OPENROUTER_CHAT_MODEL,
            messages=messages,
            tools=tools,
            tool_choice="auto",
        )

        assistant_message = response.choices[0].message
        book_chunks = []

        # If the model requested a book search, send the matching passages back to it.
        if assistant_message.tool_calls:
            messages.append(assistant_message)

            for tool_call in assistant_message.tool_calls:
                if tool_call.function.name == "search_book":
                    arguments = json.loads(tool_call.function.arguments)
                    book_chunks = retrieve_chunks(arguments["query"])
                    result = book_chunks
                else:
                    result = {"error": "That search tool is not available."}

                messages.append(
                    {
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(result),
                    }
                )

        # Handle models that print a search request instead of calling the tool.
        elif assistant_message.content and "<tool_call>" in assistant_message.content:
            search_query = get_search_query(assistant_message.content)
            if not search_query:
                return "The chat model returned an invalid search request. Please try again."

            book_chunks = retrieve_chunks(search_query)
            passages = json.dumps(book_chunks, ensure_ascii=False)
            messages = [
                messages[0],
                {
                    "role": "user",
                    "content": (
                        f"My question is: {question}\n\n"
                        f"Relevant passages from the book: {passages}\n\n"
                        "Answer my question using these passages and mention the page numbers. "
                        "Do not call tools or print tool-call tags."
                    ),
                },
            ]

        # Ask the model to write a normal answer after it has the search results.
        if assistant_message.tool_calls or (
            assistant_message.content and "<tool_call>" in assistant_message.content
        ):
            response = client.chat.completions.create(
                model=Config.OPENROUTER_CHAT_MODEL,
                messages=messages,
            )
            assistant_message = response.choices[0].message

        if assistant_message.content and "<tool_call>" in assistant_message.content:
            return "The chat model did not provide a normal answer. Please try again."

        return assistant_message.content or "The chat model did not respond."
    finally:
        client.close()
