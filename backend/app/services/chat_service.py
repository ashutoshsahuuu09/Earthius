from ollama import chat
from app.core.system_prompt import SYSTEM_PROMPT

def ask_earthius(user_message):
    print("Sending request to Ollama...")

    response = chat(
        model="gemma:2b",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message}
        ]
    )

    print("Response received!")

    return response["message"]["content"]