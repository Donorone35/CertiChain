# CertiChain - OCR and Blockchain Certificate Verification System

A full-stack certificate verification system that combines OCR-based data extraction with blockchain-backed immutability to ensure secure, tamper-proof academic credential validation.

---

## Overview

CertiChain integrates Optical Character Recognition (OCR) with blockchain technology to verify academic certificates. The system extracts structured data from documents, generates a cryptographic hash, and stores it on the Ethereum blockchain to enable tamper-proof verification.

---

## Features

### Certificate Processing Engine
- Automated certificate data extraction from PDF and image formats  
- Image preprocessing using OpenCV for improved OCR accuracy  
- OCR-based text extraction using Tesseract  
- Structured parsing of academic data into JSON format  
- OCR confidence scoring and low-quality detection  

### Blockchain Integration
- SHA-256 based document hashing  
- Immutable storage on Ethereum Sepolia testnet  
- Smart contract-based certificate registration  
- Duplicate prevention mechanism  
- Certificate verification via hash matching  
- Metadata retrieval (issuer, timestamp)  

### Admin Dashboard (Issuer Panel)
- Certificate upload interface  
- OCR data extraction and preview  
- Structured data visualization  
- Blockchain storage execution  
- Transaction hash display  
- Success and failure handling  

### User Verification System
- Certificate upload interface  
- Real-time verification processing  
- Blockchain validation of certificate authenticity  
- Extracted data display  
- OCR confidence metrics  
- Document hash display  

---

## 🧠 System Architecture
```
Certificate (PDF/Image)
│
├── Image Preprocessing (OpenCV)
│
├── OCR Extraction (Tesseract)
│
├── Structured Data Parsing (JSON)
│
├── SHA-256 Hash Generation
│
├── Blockchain Storage (Ethereum)
│
└── Verification via Hash Matching
```

---

## 🏗️ Project Structure
```
CertiChain/
│── backend/                          # Backend services (FastAPI + OCR + Blockchain)
│   │── main.py                       # Entry point for backend server
│   │── ocr/                          # OCR processing module
│   │   │── ocr_certificate_extractor.py   # Extracts data from certificates
│   │── blockchain/                   # Blockchain integration logic
│   │   │── web3_integration.py       # Handles smart contract interaction
│   │── requirements.txt              # Python dependencies
│
│── src/                              # Frontend (React + TypeScript)
│   │── components/                   # Reusable UI components
│   │   │── Navbar.tsx
│   │   │── Footer.tsx
│   │   │── FileUpload.tsx
│   │   │── ResultCard.tsx
│   │   │── Toast.tsx
│   │   │── ToastContainer.tsx
│   │   │── LoadingSpinner.tsx
│   │── pages/                        # Application pages
│   │   │── LandingPage.tsx
│   │   │── AdminLogin.tsx
│   │   │── UserLogin.tsx
│   │   │── AdminDashboard.tsx
│   │   │── VerifyCertificate.tsx
│   │── hooks/                        # Custom React hooks
│   │   │── useToast.tsx
│   │── App.tsx                       # Main React component
│   │── main.tsx                      # React entry point
│
│── index.html                        # Root HTML file
│── package.json                      # Node.js dependencies
│── tailwind.config.js                # Tailwind CSS configuration
│── postcss.config.js                 # PostCSS configuration
│── README.md                         # Project documentation
```

---

## Routes

- `/` - Landing page  
- `/admin/login` - Admin authentication  
- `/admin/dashboard` - Certificate issuance dashboard  
- `/user/login` - User login interface  
- `/verify` - Certificate verification  

---

## Technologies Used

### Backend
- Python  
- FastAPI  
- OpenCV  
- Pytesseract  
- Pillow  
- pdf2image  
- NumPy  

### Blockchain
- Web3.py  
- Solidity Smart Contract  
- Ethereum Sepolia Testnet  
- Alchemy RPC  

### Frontend
- React (Vite)  
- TypeScript  
- Tailwind CSS  
- React Router  

---

## Blockchain Design

A smart contract deployed on the Ethereum Sepolia testnet is used to store certificate hashes and metadata.

### Stored Data
- Document hash  
- Issuer address  
- Timestamp  

### Smart Contract Functions
- `storeHash(string hash)` – stores certificate hash  
- `verifyHash(string hash)` – checks existence  
- `getCertificate(string hash)` – retrieves metadata  

---

## OCR Processing and Output

The OCR pipeline enhances input quality and extracts structured information from certificates.

### Example Output

```json
{
  "student_name": "RAI TRAYAMBAK ANANDKUMAR",
  "semester": "6th",
  "sgpa": 8.75,
  "cgpa": 8.41,
  "document_image_hash": "...",
  "ocr_confidence": 90.09,
  "is_low_quality": false
}

---

## 🔄 Application Workflow
```
Certificate Issuance (Admin)
│
├── Upload Certificate
├── OCR extracts structured data
├── Hash is generated
├── Hash is stored on blockchain
└── Transaction hash is returned

Certificate Verification
│
├── Upload Certificate
├── OCR extracts data
├── Hash is generated
├── Blockchain is queried
└── Result is displayed

Condition
│
├── Hash match       → Valid certificate
└── Hash mismatch    → Invalid or tampered
```

---

## ⚙️ Installation and Setup

### 🔹 Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file:
```env
RPC_URL=your_rpc_url
CONTRACT_ADDRESS=your_contract_address
PRIVATE_KEY=your_private_key
ACCOUNT_ADDRESS=your_wallet_address
```

Run backend:
```bash
uvicorn main:app --reload
```

---

### 🔹 Frontend Setup
```bash
cd CertiChain
npm install
npm run dev
```

---

## 📌 Running Services & Ports
| Service              | Port  | Description                          |
|----------------------|-------|--------------------------------------|
| Frontend (Vite)      | 5173  | User interface                       |
| Backend (FastAPI)    | 8000  | OCR + Blockchain API                 |

---

## 🚀 Future Enhancements
- Database integration for certificate storage and history  
- Authentication system for admin and users  
- Structured verification beyond raw OCR hashing  
- Multi-format certificate support  
- Analytics and audit logging  
- Fraud detection improvements  

---

## 💡 Use Cases
- Universities issuing tamper-proof digital certificates  
- Companies verifying academic credentials during hiring  
- Government document verification systems  
- Digital credential validation platforms  

---

## ⚡ Getting Started
```bash
npm install
npm run dev
```

---

## 🏗️ Build for Production
```bash
npm run build
```

---

## 👨‍💻 Author
**Trayambak Rai**

---

## 📬 Contact
- 🐙 GitHub: [Donorone35](https://github.com/Donorone35)
- 🔗 LinkedIn: [Trayambak Rai](https://www.linkedin.com/in/trayambak-rai-314606278/)

---

**⭐ If you like this project, give it a star!** 🚀s
