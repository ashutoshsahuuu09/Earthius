from ollama import chat
from app.core.system_prompt import SYSTEM_PROMPT

DEFAULT_MODEL = "gemma:2b"

DEEP_THINK_ADDON = """

IMPORTANT: The user has requested deep thinking mode.
- Think step by step very carefully before answering.
- Consider multiple approaches and edge cases.
- Provide a thorough, comprehensive, and detailed response.
- Show your reasoning process.
"""

WEB_SEARCH_ADDON = """

IMPORTANT: The user wants a web-search-quality answer.
- Provide the most up-to-date information you have.
- Include specific facts, statistics, and references where possible.
- If your knowledge may be outdated, clearly state the knowledge cutoff.
- Structure the response like a well-researched article.
"""



# Build Conversation History

def build_messages(messages, deep_think=False, web_search=False):
    """
    Adds the system prompt before the conversation history.
    Optionally appends deep_think or web_search instructions.
    """
    system_content = SYSTEM_PROMPT

    if deep_think:
        system_content += DEEP_THINK_ADDON
    if web_search:
        system_content += WEB_SEARCH_ADDON

    history = [
        {
            "role": "system",
            "content": system_content,
        }
    ]

    for message in messages:
        # Skip messages with empty/whitespace content — Ollama rejects them
        if not message.content or not message.content.strip():
            continue
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
def ask_earthius(messages, model: str = DEFAULT_MODEL, deep_think=False, web_search=False):
    response = chat(
        model=model,
        messages=build_messages(messages, deep_think, web_search),
    )
    return response["message"]["content"]


# -------------------------
# Streaming Chat
# -------------------------
def stream_earthius(messages, model: str = DEFAULT_MODEL, deep_think=False, web_search=False):
    stream = chat(
        model=model,
        stream=True,
        messages=build_messages(messages, deep_think, web_search),
        options={
            "num_thread": 8,
            "num_predict": 2048,
        }
    )
    for chunk in stream:
        yield chunk["message"]["content"]


# -------------------------
# List Available Models
# -------------------------
def list_models():
    from ollama import list as ollama_list

    response = ollama_list()
    models = []

    for model_info in response.get("models", []):
        name = model_info.get("name", "")
        if name:
            models.append(name)

    return models