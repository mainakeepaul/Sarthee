# backend/app/routes/admin.py
from fastapi import APIRouter
from pathlib import Path

router = APIRouter()

@router.get("/low_confidence")
async def low_confidence_items():
    path = Path("app_logs.log")
    if not path.exists():
        return {"items": []}
    items = []
    # naive parse: return last 500 lines containing low_confidence or disputed
    for line in path.read_text().splitlines()[-500:]:
        if "low_confidence" in line or "disputed" in line or "[ERROR]" in line:
            items.append(line)
    return {"items": items}
