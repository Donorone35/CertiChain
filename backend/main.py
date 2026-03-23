from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os

# Allow imports from root
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ocr.ocr_certificate_extractor import extract_from_file
from blockchain.web3_integration import verify_hash, store_hash

app = FastAPI()

# -------------------------
# CORS (for frontend)
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# ROOT
# -------------------------
@app.get("/")
def home():
    return {"message": "CertiChain Backend Running 🚀"}

# -------------------------
# VERIFY (READ ONLY)
# -------------------------
@app.post("/verify")
async def verify_document(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        # OCR extraction
        parsed = extract_from_file(contents)
        document_hash = parsed["document_image_hash"]

        # Check blockchain ONLY
        exists = verify_hash(document_hash)

        return {
            "status": "verified" if exists else "not_found",
            "hash": document_hash,
            "data": parsed
        }

    except Exception as e:
        return {"error": str(e)}

# -------------------------
# ISSUE (STORE ON BLOCKCHAIN)
# -------------------------
@app.post("/issue")
async def issue_document(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        # OCR extraction
        parsed = extract_from_file(contents)
        document_hash = parsed["document_image_hash"]

        # Check if already exists
        exists = verify_hash(document_hash)

        if exists:
            return {
                "status": "already_exists",
                "hash": document_hash,
                "data": parsed
            }

        # Store on blockchain
        tx = store_hash(document_hash)

        return {
            "status": "stored",
            "hash": document_hash,
            "tx": tx,
            "data": parsed
        }

    except Exception as e:
        return {"error": str(e)}