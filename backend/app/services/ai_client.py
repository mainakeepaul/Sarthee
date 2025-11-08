# backend/app/services/ai_client.py
import httpx
from app.config import get_settings

settings = get_settings()

async def call_ai_service(payload: dict, timeout: int = 6) -> dict:
    """
    Robust call to the AI microservice. Returns a structured fallback
    on any error so the API doesn't return 500.
    """
    url = settings.AI_SERVICE_URL
    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            r = await client.post(url, json=payload)
            r.raise_for_status()
            # ensure JSON response
            try:
                return r.json()
            except Exception:
                return {"answer": "[ERROR] AI returned non-JSON", "citations": [], "confidence": "low_confidence"}
    except Exception as e:
        print("AI client error:", repr(e))
        return {"answer": "[ERROR] AI service unreachable (fallback).", "citations": [], "confidence": "low_confidence"}
