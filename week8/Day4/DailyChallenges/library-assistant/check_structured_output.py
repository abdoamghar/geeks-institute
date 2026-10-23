import os

from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel, ConfigDict

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


class ConnectionResult(BaseModel):
    model_config = ConfigDict(extra="forbid")
    ok: bool


response = client.beta.chat.completions.parse(
    model=os.environ["MODEL"],
    messages=[{"role": "user", "content": "Return JSON with {\"ok\": true}."}],
    response_format=ConnectionResult,
    max_tokens=2048,
)

message = response.choices[0].message
if message.refusal:
    raise RuntimeError("The model refused the structured-output test.")

if message.parsed is None:
    raise RuntimeError("The model returned no parsed structured output.")

print(message.parsed.model_dump_json(indent=2))
