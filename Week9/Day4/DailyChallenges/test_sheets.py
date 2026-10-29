import os

from dotenv import load_dotenv

from sheets_tools import list_sheets

load_dotenv()

spreadsheet_id = os.getenv("SPREADSHEET_ID")
if not spreadsheet_id:
    raise ValueError("Set SPREADSHEET_ID in .env")

print(list_sheets(spreadsheet_id))
