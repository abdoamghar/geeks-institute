import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("NVIDIA_API_KEY")
if not api_key or api_key == "PASTE_YOUR_NVIDIA_KEY_HERE":
    raise RuntimeError("Set NVIDIA_API_KEY in your local .env file first.")

client = OpenAI(
    base_url=os.environ["BASE_URL"],
    api_key=api_key,
    timeout=60.0,
    max_retries=0,
)

response = client.chat.completions.create(
    model=os.environ["MODEL"],
    messages=[{"role": "user", "content": "Say hello in one short sentence."}],
    max_tokens=2048,
    stream=False,
)

message = response.choices[0].message
if not message.content:
    raise RuntimeError("No final answer was returned. Check the response status and token limit.")
print(message.content.encode("ascii", errors="replace").decode("ascii"))
