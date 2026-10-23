import json
import os
from typing import Any

from dotenv import load_dotenv
from openai import OpenAI

from schemas import LibraryResponse
from tools import check_availability, find_book

load_dotenv()


def get_client() -> OpenAI:
    api_key = os.getenv("NVIDIA_API_KEY")
    if not api_key or api_key == "PASTE_YOUR_NVIDIA_KEY_HERE":
        raise RuntimeError("Set NVIDIA_API_KEY in your local .env file first.")

    return OpenAI(
        base_url=os.environ["BASE_URL"],
        api_key=api_key,
        timeout=60.0,
        max_retries=0,
    )


find_book_tool = {
    "type": "function",
    "function": {
        "name": "find_book",
        "description": "Find a library book using its title.",
        "parameters": {
            "type": "object",
            "properties": {"title": {"type": "string"}},
            "required": ["title"],
            "additionalProperties": False,
        },
    },
}

check_availability_tool = {
    "type": "function",
    "function": {
        "name": "check_availability",
        "description": "Check how many copies of a library book are available.",
        "parameters": {
            "type": "object",
            "properties": {"book_id": {"type": "string"}},
            "required": ["book_id"],
            "additionalProperties": False,
        },
    },
}


def run_student_request(student_request: str) -> LibraryResponse:
    client = get_client()
    model_name = os.environ["MODEL"]
    messages: list[dict[str, Any]] = [{"role": "user", "content": student_request}]

    first_response = client.chat.completions.create(
        model=model_name,
        messages=messages,
        tools=[find_book_tool],
        tool_choice={"type": "function", "function": {"name": "find_book"}},
        max_tokens=2048,
        temperature=0.0,
        stream=False,
    )
    first_choice = first_response.choices[0]
    first_tool_calls = first_choice.message.tool_calls
    if not first_tool_calls or len(first_tool_calls) != 1:
        raise ValueError("Expected exactly one find_book tool call.")

    first_tool_call = first_tool_calls[0]
    if first_tool_call.function.name != "find_book":
        raise ValueError("Unexpected function requested for the first stage.")

    first_args = json.loads(first_tool_call.function.arguments or "{}")
    if not isinstance(first_args, dict) or "title" not in first_args:
        raise ValueError("find_book arguments were missing or malformed.")

    find_result = find_book(first_args["title"])
    messages.append({
        "role": "assistant",
        "tool_calls": [{
            "id": first_tool_call.id,
            "type": "function",
            "function": {
                "name": first_tool_call.function.name,
                "arguments": first_tool_call.function.arguments,
            },
        }],
    })
    messages.append({
        "role": "tool",
        "tool_call_id": first_tool_call.id,
        "content": json.dumps(find_result),
    })

    availability_result = None
    if find_result["found"]:
        second_response = client.chat.completions.create(
            model=model_name,
            messages=messages,
            tools=[check_availability_tool],
            tool_choice={"type": "function", "function": {"name": "check_availability"}},
            max_tokens=2048,
            temperature=0.0,
            stream=False,
        )
        second_choice = second_response.choices[0]
        second_tool_calls = second_choice.message.tool_calls
        if not second_tool_calls or len(second_tool_calls) != 1:
            raise ValueError("Expected exactly one check_availability tool call.")

        second_tool_call = second_tool_calls[0]
        if second_tool_call.function.name != "check_availability":
            raise ValueError("Unexpected function requested for the second stage.")

        second_args = json.loads(second_tool_call.function.arguments or "{}")
        if not isinstance(second_args, dict) or "book_id" not in second_args:
            raise ValueError("check_availability arguments were missing or malformed.")
        if second_args["book_id"] != find_result["book_id"]:
            raise ValueError("The second-stage book_id does not match the book found in stage one.")

        availability_result = check_availability(find_result["book_id"])
        messages.append({
            "role": "assistant",
            "tool_calls": [{
                "id": second_tool_call.id,
                "type": "function",
                "function": {
                    "name": second_tool_call.function.name,
                    "arguments": second_tool_call.function.arguments,
                },
            }],
        })
        messages.append({
            "role": "tool",
            "tool_call_id": second_tool_call.id,
            "content": json.dumps(availability_result),
        })

    messages.append({
        "role": "user",
        "content": (
            "Return only a valid JSON object matching LibraryResponse. "
            "Use only the tool results. "
            f"Exact book title: {find_result['title']}\n"
            f"Exact book_id: {find_result.get('book_id')}\n"
            f"Availability result: {json.dumps(availability_result) if availability_result is not None else 'None'}\n"
            "If no book was found, status must be 'not_found' and book_id must be null. "
            "If book found and copies > 0, status must be 'available'. "
            "If book found and copies == 0, status must be 'unavailable'."
        ),
    })

    final_response = client.beta.chat.completions.parse(
        model=model_name,
        messages=messages,
        response_format=LibraryResponse,
        max_tokens=2048,
    )
    final_message = final_response.choices[0].message
    if final_message.refusal:
        raise ValueError("The model declined to provide a final answer.")

    final_result = final_message.parsed
    if final_result is None:
        raise ValueError("The model returned no parsed final answer.")

    final_result.book_title = find_result["title"] if find_result["title"] else ""
    final_result.book_id = find_result["book_id"] if find_result["found"] else None
    if find_result["found"]:
        copies = availability_result["available_copies"] if availability_result else 0
        final_result.status = "available" if copies and copies > 0 else "unavailable"
    else:
        final_result.status = "not_found"

    return final_result


def main() -> None:
    request = input("Ask a question about a library book: ").strip()
    try:
        result = run_student_request(request)
        print(result.model_dump_json(indent=2))
    except Exception as exc:
        fallback = LibraryResponse(
            book_title="",
            book_id=None,
            status="error",
            message=f"Request failed: {exc}",
        )
        print(fallback.model_dump_json(indent=2))


if __name__ == "__main__":
    main()
