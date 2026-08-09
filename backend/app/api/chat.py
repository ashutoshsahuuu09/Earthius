from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.api.schemas import ChatRequest, ChatResponse
from app.services.chat_service import ask_earthius, stream_earthius

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    answer = ask_earthius(
        request.messages,
        model=request.model or "gemma:2b",
        deep_think=request.deep_think,
        web_search=request.web_search,
    )
    return ChatResponse(response=answer)


@router.post("/chat/stream")
def chat_stream(request: ChatRequest):
    def generate():
        for chunk in stream_earthius(
            request.messages,
            model=request.model or "gemma:2b",
            deep_think=request.deep_think,
            web_search=request.web_search,
        ):
            yield chunk

    return StreamingResponse(
        generate(),
        media_type="text/plain"
    )