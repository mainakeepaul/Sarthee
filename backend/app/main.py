from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.query import router as query_router
from app.routes.admin import router as admin_router
from app.routes.feedback import router as feedback_router
from app.config import get_settings


settings = get_settings()
app = FastAPI(title="Localized RAG Backend - Demo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(query_router, prefix="")
app.include_router(admin_router, prefix="/admin")
app.include_router(feedback_router, prefix="")

@app.get("/health")
async def health():
    return {"status": "ok", "env": settings.ENV}


@app.get("/users")
async def get_users():
    return [
        {"id": 1, "name": "Test User 1", "email": "test1@example.com"},
        {"id": 2, "name": "Test User 2", "email": "test2@example.com"}
    ]

print("✅ Simple backend server ready!")