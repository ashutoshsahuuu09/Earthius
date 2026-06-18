from ollama import chat
from app.core.system_prompt import SYSTEM_PROMPT


# -------------------------
# Build Conversation History
# -------------------------
def build_messages(messages):
    """
    Adds the system prompt before the conversation history.
    """

    history = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT,
        }
    ]

    for message in messages:
        history.append(
            {
                "role": message.role,
                "content": message.content,
            }
        )

    return history


# -------------------------
# Normal Chat
# -------------------------
def ask_earthius(messages):
    response = chat(
        model="gemma:2b",
        messages=build_messages(messages),
    )

    return response["message"]["content"]


# -------------------------
# Streaming Chat
# -------------------------
def stream_earthius(messages):
    stream = chat(
        model="gemma:2b",
        stream=True,
        messages=build_messages(messages),
    )

    for chunk in stream:
        yield chunk["message"]["content"]