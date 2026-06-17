from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.api.schemas import ChatRequest, ChatResponse
from app.services.chat_service import ask_earthius, stream_earthius

router = APIRouter()


# Normal Chat (keep this)
@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    answer = ask_earthius(request.message)
    return ChatResponse(response=answer)


# Streaming Chat (NEW)
@router.post("/chat/stream")
def chat_stream(request: ChatRequest):

    def generate():
        for chunk in stream_earthius(request.message):
            yield chunk

    return StreamingResponse(
        generate(),
        media_type="text/plain"
    )