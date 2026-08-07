from fastapi import APIRouter

from app.schemas.chat_request import ChatRequest
from app.schemas.chat_response import ChatResponse

from app.services.assistant import get_ai_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    reply = get_ai_response(
        request.message,
        request.user_id,
        request.job_id
    )

    return ChatResponse(reply=reply)