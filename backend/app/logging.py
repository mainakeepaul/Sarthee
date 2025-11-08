# backend/app/logging.py
import logging
from logging.handlers import RotatingFileHandler
import os

LOG_PATH = os.getenv("HNP_LOG", "app_logs.log")

logger = logging.getLogger("hnp")
logger.setLevel(logging.INFO)

if not logger.handlers:
    handler = RotatingFileHandler(LOG_PATH, maxBytes=2_000_000, backupCount=3)
    fmt = "%(asctime)s %(levelname)s %(message)s"
    handler.setFormatter(logging.Formatter(fmt))
    logger.addHandler(handler)
