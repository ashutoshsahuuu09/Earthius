from fastapi import APIRouter
from app.services.chat_service import list_models

router = APIRouter()


@router.get("/models")
def get_models():
    try:
        models = list_models()
        return {"models": models}
    except Exception:
        return {"models": []}
