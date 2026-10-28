from flask import Flask, render_template
from mongoengine import connect

from config import Config
from routes.chat_routes import chat_routes


# Create the Flask app and connect its settings and chat route.
if not Config.MONGODB_URL:
    raise ValueError("Set MONGODB_URL in the .env file.")

connect(host=Config.MONGODB_URL)

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(chat_routes)


@app.route("/")
def home():
    return render_template("index.html")


# Debug mode is useful locally; turn it off before deploying the app.
if __name__ == "__main__":
    app.run(debug=True)