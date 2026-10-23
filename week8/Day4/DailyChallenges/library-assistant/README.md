# Library Assistant

A simple Python terminal app that lets a student ask whether a library book is available.

## Install

```bash
cd "geeks-institute/week8/Day4/DailyChallenges/library-assistant"
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

## Create a local .env file

```env
NVIDIA_API_KEY=PASTE_YOUR_NVIDIA_KEY_HERE
BASE_URL=https://integrate.api.nvidia.com/v1
MODEL=z-ai/glm-5.3-flash
```

## Run the checks

```bash
.\.venv\Scripts\python.exe check_connection.py
.\.venv\Scripts\python.exe check_structured_output.py
```

## Run the app

```bash
.\.venv\Scripts\python.exe app.py
```
