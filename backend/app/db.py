# backend/app/db.py
from pymongo import MongoClient
import certifi
from app.config import get_settings

settings = get_settings()

# Create a Mongo client that uses certifi's CA bundle for SSL verification
client = MongoClient(
    settings.MONGO_URI,
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=5000
)

# Default DB
db = client[settings.MONGO_DB]

# helper accessor functions used across the app
def sessions_collection():
    return db.get_collection("sessions")

def queries_collection():
    return db.get_collection("queries")

def feedback_collection():
    return db.get_collection("feedback")
