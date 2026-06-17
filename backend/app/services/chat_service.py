from ollama import chat
from app.core.system_prompt import SYSTEM_PROMPT


def stream_earthius(user_message):
    stream = chat(
        model="gemma:2b",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        stream=True,
    )

    for chunk in stream:
        yield chunk["message"]["content"]


def ask_earthius(user_message):
    response = chat(
        model="gemma:2b",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
    )

    return response["message"]["content"]