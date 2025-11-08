Localized GenAI Demo - Full Project Scaffold
============================================

What is included:
- frontend/  (Next.js scaffold - minimal page that calls backend /query)
- backend/   (FastAPI backend app under backend/app)
- backend/mock_ai_service.py  (a simple FastAPI mocked AI at port 9000)
- docker-compose.yml (optional)
- README with run instructions

Quick Run (local, without docker)
---------------------------------
1. Backend:
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   # Run mock AI service:
   uvicorn mock_ai_service:app --reload --port 9000
   # In another terminal, run backend:
   uvicorn app.main:app --reload --port 8000

2. Frontend (you need Node.js installed to run Next.js dev):
   cd frontend
   # install deps (optional for demo)
   npm install
   npm run dev
   # open http://localhost:3000 and ask a query (it will call backend and mock AI)

Notes:
- The frontend is a minimal scaffold; you can replace it with your teammate's Next.js project by copying their pages into frontend/pages.
- The backend calls the mock AI at http://localhost:9000/rag by default (see backend/.env).
- MongoDB and vector DB integrations are not included; those will be added when you integrate the AI teammate's ingest pipeline.

Files created under /mnt/data/hackn_pitch_project
