from fastapi import APIRouter
from app.api.schemas import ChatRequest, ChatResponse
from app.services.chat_service import ask_earthius

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    answer = ask_earthius(request.message)
    return ChatResponse(response=answer)