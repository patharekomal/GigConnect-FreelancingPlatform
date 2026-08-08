from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from app.routers.chat import router as chat_router

app = FastAPI(
    title="GigConnect AI Service",
    description="AI Assistant for GigConnect Freelancing Platform",
    version="1.0.0"
)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, OPTIONS, etc.
    allow_headers=["*"],  # Allows all frontend headers
)
app.include_router(chat_router)


@app.get("/")
def home():

    return {
        "message": "GigConnect AI Backend Running Successfully!"
    }