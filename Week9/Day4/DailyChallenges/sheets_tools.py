import os

from dotenv import load_dotenv
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

load_dotenv()


def get_sheets_service():
    credentials = Credentials.from_service_account_file(
        os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON", "service_account.json"),
        scopes=["https://www.googleapis.com/auth/spreadsheets"],
    )
    return build("sheets", "v4", credentials=credentials).spreadsheets()


def read_range(spreadsheet_id: str, range_: str) -> dict:
    """Read values from a Google Sheet range."""
    service = get_sheets_service()
    result = (
        service.values()
        .get(
            spreadsheetId=spreadsheet_id,
            range=range_,
            valueRenderOption="FORMATTED_VALUE",
        )
        .execute()
    )
    values = result.get("values", [])
    return {"range": result.get("range"), "rows": len(values), "data": values}


def write_range(spreadsheet_id: str, range_: str, values: list) -> dict:
    """Write a 2D list of values to a Google Sheet range."""
    service = get_sheets_service()
    result = (
        service.values()
        .update(
            spreadsheetId=spreadsheet_id,
            range=range_,
            valueInputOption="USER_ENTERED",
            body={"values": values},
        )
        .execute()
    )
    return {
        "updated_cells": result.get("updatedCells"),
        "range": result.get("updatedRange"),
    }


def append_rows(spreadsheet_id: str, range_: str, values: list) -> dict:
    """Append rows after the last row with data in the given range."""
    service = get_sheets_service()
    result = (
        service.values()
        .append(
            spreadsheetId=spreadsheet_id,
            range=range_,
            valueInputOption="USER_ENTERED",
            insertDataOption="INSERT_ROWS",
            body={"values": values},
        )
        .execute()
    )
    updates = result.get("updates", {})
    return {
        "appended_rows": updates.get("updatedRows"),
        "range": updates.get("updatedRange"),
    }


def clear_range(spreadsheet_id: str, range_: str) -> dict:
    """Clear all values from a given range."""
    service = get_sheets_service()
    result = (
        service.values()
        .clear(spreadsheetId=spreadsheet_id, range=range_)
        .execute()
    )
    return {"cleared_range": result.get("clearedRange")}


def list_sheets(spreadsheet_id: str) -> dict:
    """List all sheet tab names in a spreadsheet."""
    service = get_sheets_service()
    metadata = service.get(spreadsheetId=spreadsheet_id).execute()
    sheets = [sheet["properties"]["title"] for sheet in metadata.get("sheets", [])]
    return {"spreadsheet_title": metadata["properties"]["title"], "sheets": sheets}


def add_sheet(spreadsheet_id: str, sheet_name: str) -> dict:
    """Add a new sheet tab to the spreadsheet."""
    service = get_sheets_service()
    result = service.batchUpdate(
        spreadsheetId=spreadsheet_id,
        body={"requests": [{"addSheet": {"properties": {"title": sheet_name}}}]},
    ).execute()
    new_sheet = result["replies"][0]["addSheet"]["properties"]
    return {"sheet_id": new_sheet["sheetId"], "title": new_sheet["title"]}


def format_cells(
    spreadsheet_id: str,
    sheet_name: str,
    start_row: int,
    end_row: int,
    start_col: int,
    end_col: int,
    bold: bool = False,
    background_color: dict = None,
) -> dict:
    """Apply bold and/or background color to a cell range."""
    service = get_sheets_service()
    metadata = service.get(spreadsheetId=spreadsheet_id).execute()
    sheet_id = next(
        sheet["properties"]["sheetId"]
        for sheet in metadata["sheets"]
        if sheet["properties"]["title"] == sheet_name
    )

    cell_format = {}
    if bold:
        cell_format["textFormat"] = {"bold": True}
    if background_color:
        cell_format["backgroundColor"] = background_color

    fields = []
    if bold:
        fields.append("textFormat")
    if background_color:
        fields.append("backgroundColor")
    if not fields:
        raise ValueError("Set bold or provide a background_color.")

    service.batchUpdate(
        spreadsheetId=spreadsheet_id,
        body={
            "requests": [
                {
                    "repeatCell": {
                        "range": {
                            "sheetId": sheet_id,
                            "startRowIndex": start_row,
                            "endRowIndex": end_row,
                            "startColumnIndex": start_col,
                            "endColumnIndex": end_col,
                        },
                        "cell": {"userEnteredFormat": cell_format},
                        "fields": "userEnteredFormat(" + ",".join(fields) + ")",
                    }
                }
            ]
        },
    ).execute()
    return {
        "formatted": True,
        "sheet": sheet_name,
        "rows": f"{start_row}-{end_row}",
    }
