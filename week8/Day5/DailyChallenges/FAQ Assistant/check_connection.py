import os

from dotenv import load_dotenv
from openai import OpenAI


def main():
    load_dotenv()

    api_key = os.getenv("NVIDIA_API_KEY")
    base_url = os.getenv("BASE_URL")
    model = os.getenv("MODEL")

    if not api_key:
        print("Missing NVIDIA_API_KEY in your .env file.")
        return

    if not base_url or not model:
        print("Missing BASE_URL or MODEL in your .env file.")
        return

    client = OpenAI(api_key=api_key, base_url=base_url)

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": "Say hello in one short sentence."},
            ],
            max_tokens=30,
            timeout=20,
        )

        text = response.choices[0].message.content
        if text:
            print(text.strip())
        else:
            print("Connection succeeded, but the model returned no text.")
    except Exception as error:
        print(f"Connection failed: {error}")


if __name__ == "__main__":
    main()
