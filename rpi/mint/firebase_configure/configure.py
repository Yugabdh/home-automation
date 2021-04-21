import firebase_admin
import json

from firebase_admin import credentials
from firebase_admin import firestore

from pathlib import Path


# Use a service account
path = Path(__file__).parent / "serviceAccount.json"

firebaseConfig = dict()

with open(path) as f:
    data = json.load(f)
    firebaseConfig.update(data)

cred = credentials.Certificate(firebaseConfig)
firebase_admin.initialize_app(cred)

db = firestore.client()
