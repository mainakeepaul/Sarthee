from fastapi import APIRouter, Request
from pydantic import BaseModel
from app.utils import new_session_id, now_iso
from app.services.ai_client import call_ai_service
from app.db import sessions_collection, queries_collection
from datetime import datetime

router = APIRouter()

class QueryRequest(BaseModel):
    session_id: str | None = None
    query: str
    region: str | None = "pune"
    lang: str | None = "auto"

class SourceItem(BaseModel):
    title: str | None = None
    url: str | None = None
    snippet: str | None = None
    score: float | None = None

class QueryResponse(BaseModel):
    answer: str
    citations: list[SourceItem]
    confidence: str
    session_id: str
    query_id: str | None = None

@router.post("/query", response_model=QueryResponse)
async def query_endpoint(req: QueryRequest, request: Request):
    sid = req.session_id or request.headers.get("X-Session-ID") or new_session_id()

    sessions_collection().update_one(
        {"session_id": sid},
        {"$setOnInsert": {"session_id": sid, "meta": {"region": req.region, "lang": req.lang}, "created_at": datetime.utcnow(), "last_seen": datetime.utcnow(), "queries": []}},
        upsert=True
    )

    payload = {"session_id": sid, "query": req.query, "region": req.region, "lang": req.lang, "timestamp": now_iso()}
    ai_resp = await call_ai_service(payload)

    qdoc = {
        "session_id": sid,
        "query": req.query,
        "region": req.region,
        "lang": req.lang,
        "ai_answer": ai_resp.get("answer"),
        "citations": ai_resp.get("citations", []),
        "confidence": ai_resp.get("confidence", "low_confidence"),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "reviewed": False
    }
    result = queries_collection().insert_one(qdoc)
    query_id = str(result.inserted_id)

    sessions_collection().update_one(
        {"session_id": sid},
        {"$set": {"last_seen": datetime.utcnow()},
         "$push": {"queries": {"query_id": query_id, "t": datetime.utcnow(), "text": req.query}}}
    )

    citations = ai_resp.get("citations", [])
    return QueryResponse(
        answer=ai_resp.get("answer", ""),
        citations=citations,
        confidence=ai_resp.get("confidence", "low_confidence"),
        session_id=sid,
        query_id=query_id
    )
