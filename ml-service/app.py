from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

model = joblib.load('model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

class ScanRequest(BaseModel):
    text: str

@app.post('/predict')
def predict(req: ScanRequest):
    vec = vectorizer.transform([req.text])
    pred = model.predict(vec)[0]
    prob = model.predict_proba(vec)[0]
    confidence = round(max(prob) * 100, 2)

    return {
        "verdict": "Scam" if pred == 1 else "Safe",
        "confidence": confidence
    }