import sys
import os
import json
from web3 import Web3
from dotenv import load_dotenv

# Allow imports from project root
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# -------------------------
# LOAD ENV
# -------------------------

load_dotenv(os.path.join(os.path.dirname(__file__), "..", "backend", ".env"))

RPC_URL = os.getenv("RPC_URL")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
ACCOUNT_ADDRESS = os.getenv("ACCOUNT_ADDRESS")

# -------------------------
# ABI
# -------------------------

ABI = json.loads("""[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "documentHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "HashStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "storeHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "verifyHash",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]""")  # keep your ABI here

# -------------------------
# WEB3 CONNECTION (SAFE)
# -------------------------

def get_contract():
    if not RPC_URL:
        raise Exception("RPC_URL missing in .env")

    w3 = Web3(Web3.HTTPProvider(RPC_URL))

    if not w3.is_connected():
        raise Exception("Blockchain not connected")

    contract = w3.eth.contract(
        address=Web3.to_checksum_address(CONTRACT_ADDRESS),
        abi=ABI
    )

    return w3, contract

# -------------------------
# STORE HASH
# -------------------------

def store_hash(document_hash: str):
    try:
        w3, contract = get_contract()

        nonce = w3.eth.get_transaction_count(ACCOUNT_ADDRESS)

        tx = contract.functions.storeHash(document_hash).build_transaction({
            'from': ACCOUNT_ADDRESS,
            'nonce': nonce,
            'gas': 200000,
            'gasPrice': w3.to_wei('10', 'gwei')
        })

        signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)

        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        return {
            "status": "success",
            "tx_hash": tx_hash.hex()
        }

    except Exception as e:
        return {"error": str(e)}

# -------------------------
# VERIFY HASH
# -------------------------

def verify_hash(document_hash: str):
    try:
        _, contract = get_contract()
        return contract.functions.verifyHash(document_hash).call()

    except Exception as e:
        print("Error verifying:", str(e))
        return False

# -------------------------
# GET CERTIFICATE
# -------------------------

def get_certificate(document_hash: str):
    try:
        _, contract = get_contract()

        exists, timestamp, issuer = contract.functions.getCertificate(document_hash).call()

        return {
            "exists": exists,
            "timestamp": timestamp,
            "issuer": issuer
        }

    except Exception as e:
        return {"error": str(e)}