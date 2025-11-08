# backend/app/routes/feedback.py
from fastapi import APIRouter
from pydantic import BaseModel
from app.db import feedback_collection, queries_collection
from datetime import datetime
from bson import ObjectId

router = APIRouter()

class FeedbackReq(BaseModel):
    session_id: str
    query_id: str
    corrected_answer: str
    user_meta: dict | None = None

@router.post("/feedback")
async def feedback_endpoint(payload: FeedbackReq):
    doc = {
        "session_id": payload.session_id,
        "query_id": payload.query_id,
        "corrected_answer": payload.corrected_answer,
        "user_meta": payload.user_meta or {},
        "created_at": datetime.utcnow()
    }
    feedback_collection().insert_one(doc)
    # try to mark original query reviewed (safe wrapped)
    try:
        queries_collection().update_one(
            {"_id": ObjectId(payload.query_id)},
            {"$set": {"reviewed": True, "reviewed_at": datetime.utcnow()}}
        )
    except Exception:
        # ignore if query_id invalid or not found
        pass
    return {"ok": True}

