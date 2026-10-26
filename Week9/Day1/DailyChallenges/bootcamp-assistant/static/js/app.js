const form = document.querySelector("#chat-form");
const input = document.querySelector("#message-input");
const conversation = document.querySelector("#conversation");
const status = document.querySelector("#status");
const loading = document.querySelector("#loading");
const sendButton = form.querySelector("button");

// Add a visitor or assistant message to the conversation.
function addMessage(text, sender) {
  const message = document.createElement("p");
  message.className = `message message--${sender}`;
  // textContent displays plain text and does not run HTML from the model.
  message.textContent = text;
  conversation.append(message);
  // Keep the newest message visible.
  conversation.scrollTop = conversation.scrollHeight;
}

// Send the visitor's message to Flask when the form is submitted.
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Ignore a message that contains only spaces.
  const message = input.value.trim();
  if (!message) return;

  // Show the visitor's message and indicate that the app is working.
  addMessage(message, "user");
  input.value = "";
  status.textContent = "";
  sendButton.disabled = true;
  loading.hidden = false;

  try {
    // Send the message to the backend as JSON.
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const result = await response.json();

    // Display an error if Flask did not accept the request.
    if (!response.ok) {
      throw new Error(result.error || "The assistant couldn't process your question.");
    }

    // Show the assistant's reply.
    addMessage(result.answer, "assistant");
  } catch (error) {
    // Put request errors somewhere the visitor can see.
    status.textContent = error.message;
  } finally {
    // Re-enable the form when the request finishes.
    loading.hidden = true;
    sendButton.disabled = false;
    input.focus();
  }
});

// Start an empty server-side conversation when the visitor clicks this button.
document.querySelector("#new-session").addEventListener("click", async () => {
  status.textContent = "";
  try {
    // Ask Flask to clear the current conversation.
    const response = await fetch("/api/new-session", { method: "POST" });
    if (!response.ok) throw new Error("Could not start a new conversation.");

    // Clear old messages and show a greeting.
    conversation.replaceChildren();
    addMessage("Hi! Ask me about your bootcamp or registration.", "assistant");
  } catch (error) {
    status.textContent = error.message;
  }
});
