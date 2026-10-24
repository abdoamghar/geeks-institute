import json
import os

from dotenv import load_dotenv
from openai import OpenAI

from ingest import build_index
from tools import MODEL_TOOL_DEFINITION, search_faqs

load_dotenv()


def get_client():
    api_key = os.getenv("NVIDIA_API_KEY")
    base_url = os.getenv("BASE_URL")
    model = os.getenv("MODEL")

    if not api_key or not base_url or not model:
        return None

    return OpenAI(api_key=api_key, base_url=base_url)


def ensure_faq_index():
    try:
        build_index()
    except Exception:
        pass


def answer_question(question):
    ensure_faq_index()

    if not question or not question.strip():
        return "Please type a question first."

    client = get_client()
    if client is None:
        results = search_faqs(question, limit=3)
        if not results:
            return "I could not find a matching FAQ answer. Please add your NVIDIA API key and rebuild the index."

        summary = "\n\n".join(
            f"FAQ #{item['faq_id']} ({item['category']}): {item['question']}\nAnswer: {item['answer']}"
            for item in results
        )
        return summary

    try:
        tool_call_request = client.chat.completions.create(
            model=os.getenv("MODEL", "openai/gpt-oss-20b"),
            messages=[
                {"role": "user", "content": question},
            ],
            tools=[MODEL_TOOL_DEFINITION],
            tool_choice="auto",
            temperature=0.2,
            timeout=20,
        )
    except Exception:
        results = search_faqs(question, limit=3)
        if not results:
            return "I could not reach the model or find a matching FAQ. Please check your NVIDIA connection and try again."

        return "\n\n".join(
            f"FAQ #{item['faq_id']} ({item['category']}): {item['question']}\nAnswer: {item['answer']}"
            for item in results
        )

    assistant_message = tool_call_request.choices[0].message

    if assistant_message.tool_calls:
        try:
            tool_call = assistant_message.tool_calls[0]
            arguments = json.loads(tool_call.function.arguments)
            search_results = search_faqs(**arguments)

            context = "\n\n".join(
                f"FAQ #{item['faq_id']} ({item['category']}):\nQuestion: {item['question']}\nAnswer: {item['answer']}"
                for item in search_results
            )

            final_response = client.chat.completions.create(
                model=os.getenv("MODEL", "openai/gpt-oss-20b"),
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful online store support assistant. Use the FAQ results to answer the customer clearly. Mention relevant FAQ numbers when useful.",
                    },
                    {"role": "user", "content": f"Customer question: {question}\n\nFAQ context:\n{context}"},
                ],
                temperature=0.2,
                timeout=20,
            )

            return final_response.choices[0].message.content or "I could not generate a useful answer."
        except Exception:
            results = search_faqs(question, limit=3)
            if not results:
                return "I could not reach the model or find a matching FAQ. Please check your NVIDIA connection and try again."
            return "\n\n".join(
                f"FAQ #{item['faq_id']} ({item['category']}): {item['question']}\nAnswer: {item['answer']}"
                for item in results
            )

    return assistant_message.content or "I could not answer that question."


def main():
    print("Type 'quit' to exit.")
    while True:
        question = input("Ask a question: ").strip()
        if question.lower() in {"quit", "exit", "q"}:
            print("Goodbye!")
            break

        answer = answer_question(question)
        print("\nAnswer:")
        print(answer)
        print("\n" + "-" * 40)


if __name__ == "__main__":
    main()
