from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Mock AI Service")

class RagRequest(BaseModel):
    session_id: str
    query: str
    region: str
    lang: str

class Citation(BaseModel):
    title: str
    url: str
    snippet: str

class RagResponse(BaseModel):
    answer: str
    citations: List[Citation]
    confidence: str

@app.post("/rag", response_model=RagResponse)
async def rag(req: RagRequest):
    # Very simple mocked logic: echo and include fake citation
    ans = f"Mocked AI answer for region={req.region}: We found that property tax process includes filing the form and paying online."
    citations = [Citation(title="Pune Municipal - Property Tax", url="https://pmc.gov.in/fake.pdf", snippet="Pay via online portal; pay through challan; upload documents.")]
    return RagResponse(answer=ans, citations=citations, confidence="trusted")

@app.get('/health')
async def health():
    return {'status':'ok'}
