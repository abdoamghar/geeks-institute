from datetime import datetime

from mongoengine import DateTimeField, DictField, Document, ListField, StringField


class Conversation(Document):
    # Use the browser-generated conversation ID as this document's MongoDB ID.
    id = StringField(primary_key=True, max_length=36)
    name = StringField(max_length=80, default="Guest")
    messages = ListField(DictField(), default=list)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "conversations"}
