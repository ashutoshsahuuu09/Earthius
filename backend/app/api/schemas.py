from pydantic import BaseModel
from typing import List, Optional


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: Optional[str] = None
    deep_think: bool = False
    web_search: bool = False


class ChatResponse(BaseModel):
    response: str