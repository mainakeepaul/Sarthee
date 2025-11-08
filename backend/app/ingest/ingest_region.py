# backend/app/ingest/ingest_region.py
import argparse
import json
from pathlib import Path
from app.logging import logger

def ingest_region(region: str, sources_file: str):
    logger.info(f"Starting ingest for region={region} using {sources_file}")
    src_path = Path(sources_file)
    if not src_path.exists():
        print(f"No sources file: {src_path}")
        return
    sources = json.loads(src_path.read_text())
    print(f"[ingest] Found {len(sources)} source(s) for {region}")
    for s in sources:
        print(" -", s.get("title") or s.get("url"))
    # placeholder: here you'd do OCR -> chunk -> embed -> upsert
    logger.info(f"Completed ingest stub for {region}")

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--region", required=True)
    p.add_argument("--sources", default="pune/sources.json")
    args = p.parse_args()
    ingest_region(args.region, args.sources)
