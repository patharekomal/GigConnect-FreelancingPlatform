from fastapi import FastAPI

from app.routers.chat import router as chat_router

app = FastAPI(
    title="GigConnect AI Service",
    description="AI Assistant for GigConnect Freelancing Platform",
    version="1.0.0"
)

app.include_router(chat_router)


@app.get("/")
def home():

    return {
        "message": "GigConnect AI Backend Running Successfully!"
    }