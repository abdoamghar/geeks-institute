import os
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from email_validator import EmailNotValidError, validate_email
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError, PyMongoError


# Load MongoDB settings from the .env file beside this script.
load_dotenv(Path(__file__).with_name(".env"))

# These are the six pieces of information required for a registration.
FIELDS = {
    "full_name",
    "phone",
    "email",
    "age",
    "level_education",
    "city",
}


def validate_profile(profile):
    # Check that the input is a dictionary with exactly the required fields.
    if not isinstance(profile, dict) or set(profile) != FIELDS:
        return None, "Provide all six profile fields and no extra fields."

    # Remove extra spaces from the text fields.
    clean = {}
    for key, value in profile.items():
        if isinstance(value, str):
            clean[key] = value.strip()
        else:
            clean[key] = value

    # Make sure each text field contains a value.
    for key in FIELDS:
        if key != "age" and not clean[key]:
            return None, "Profile fields cannot be empty."

    # The age must be a positive whole number.
    age = clean["age"]
    if isinstance(age, bool) or not isinstance(age, int) or age < 1:
        return None, "Age must be a positive whole number."

    # Store every email in lowercase so duplicates are easier to detect.
    clean["email"] = clean["email"].lower()

    # Check that the email follows a valid email format.
    try:
        clean["email"] = validate_email(
            clean["email"], check_deliverability=False
        ).normalized
    except EmailNotValidError:
        return None, "Enter a valid email address."

    return clean, None


def save_profile_info(profile):
    # Validate profile data before connecting to MongoDB.
    clean, error = validate_profile(profile)
    if error:
        return {"ok": False, "status": "invalid", "error": error}

    # Read the database connection address from .env.
    uri = os.getenv("MONGODB_URI")
    if not uri:
        return {
            "ok": False,
            "status": "unavailable",
            "error": "MONGODB_URI is not set.",
        }

    # Connect to the selected MongoDB collection.
    client = None
    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        database_name = os.getenv("MONGODB_DB", "bootcamp")
        collection_name = os.getenv("MONGODB_COLLECTION", "registrations")
        collection = client[database_name][collection_name]

        # Prevent two registrations from using the same email address.
        collection.create_index("email", unique=True)

        # Record when the profile was created and when consent was given.
        now = datetime.now(timezone.utc)
        clean.update(status="lead", created_at=now, consent_at=now)

        # Insert a new registration without replacing an existing profile.
        result = collection.insert_one(clean)

        if not result.acknowledged:
            return {
                "ok": False,
                "status": "error",
                "error": "MongoDB did not confirm the save.",
            }
        return {
            "ok": True,
            "status": "created",
            "registration_id": str(result.inserted_id),
        }
    except DuplicateKeyError:
        # Do not expose the existing profile when an email is already registered.
        return {"ok": True, "status": "already_registered"}
    except PyMongoError:
        # Give a safe error instead of showing private connection details.
        return {
            "ok": False,
            "status": "unavailable",
            "error": "MongoDB is unavailable.",
        }
    finally:
        # Close the connection whether the save worked or failed.
        if client:
            client.close()
