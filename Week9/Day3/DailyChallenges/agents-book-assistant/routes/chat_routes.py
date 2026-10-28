from datetime import datetime
from uuid import UUID

from flask import Blueprint, current_app, jsonify, request
from openai import APIConnectionError, APIStatusError, RateLimitError

from agents.book_agent import answer_question
from models import Conversation


chat_routes = Blueprint("chat_routes", __name__)


def is_valid_conversation_id(conversation_id):
    # Accept only UUIDs so arbitrary values are not used as database keys.
    try:
        return str(UUID(conversation_id)) == conversation_id
    except (ValueError, TypeError, AttributeError):
        return False


@chat_routes.route("/chat/<conversation_id>", methods=["GET"])
def get_conversation(conversation_id):
    if not is_valid_conversation_id(conversation_id):
        return jsonify({"error": "Invalid conversation ID."}), 400

    try:
        conversation = Conversation.objects(id=conversation_id).first()
        if conversation is None:
            return jsonify({"messages": [], "name": None})

        return jsonify({
            "messages": conversation.messages,
            "name": conversation.name,
        })
    except Exception:
        current_app.logger.exception("Could not load the conversation from MongoDB.")
        return jsonify({"error": "Could not load this conversation from MongoDB."}), 503


@chat_routes.route("/chat", methods=["POST"])
def chat():
    # Accept chat messages as JSON and return the assistant's reply as JSON.
    data = request.get_json(silent=True) or {}
    if not isinstance(data, dict):
        return jsonify({"error": "Send your message as JSON."}), 400

    message = data.get("message")

    if not isinstance(message, str) or not message.strip():
        return jsonify({"error": "Please enter a message."}), 400

    conversation_id = data.get("conversation_id")
    if not is_valid_conversation_id(conversation_id):
        return jsonify({"error": "A valid conversation ID is required."}), 400

    name = data.get("name", "Guest")
    if not isinstance(name, str) or len(name.strip()) > 80:
        return jsonify({"error": "Name must be 80 characters or fewer."}), 400
    name = name.strip() or "Guest"

    try:
        conversation = Conversation.objects(id=conversation_id).first()
        if conversation is None:
            conversation = Conversation(id=conversation_id, name=name)

        # Send only past user and assistant messages to the model.
        history = [
            {"role": item["role"], "content": item["content"]}
            for item in conversation.messages
            if item.get("role") in ("user", "assistant")
        ]
        answer = answer_question(message.strip(), history)

        # Save the successful exchange so future messages can use it as context.
        conversation.name = name
        conversation.messages.extend([
            {"role": "user", "content": message.strip()},
            {"role": "assistant", "content": answer},
        ])
        conversation.updated_at = datetime.utcnow()
        conversation.save()

        return jsonify({"answer": answer})
    except RateLimitError:
        current_app.logger.exception("OpenRouter rate-limited the chat request.")
        return jsonify(
            {
                "error": (
                    "The chat model did not respond because OpenRouter is "
                    "rate-limiting requests. Check model availability or account "
                    "limits, then try again."
                )
            }
        ), 503
    except APIConnectionError:
        current_app.logger.exception("Could not connect to OpenRouter.")
        return jsonify(
            {"error": "Could not connect to OpenRouter. Check your internet connection and try again."}
        ), 502
    except APIStatusError as error:
        current_app.logger.exception("OpenRouter returned an API error.")
        return jsonify(
            {"error": f"OpenRouter returned an error (HTTP {error.status_code})."}
        ), 502
    except Exception:
        current_app.logger.exception("The chat request failed.")
        return jsonify({"error": "Sorry, the assistant could not answer right now."}), 500