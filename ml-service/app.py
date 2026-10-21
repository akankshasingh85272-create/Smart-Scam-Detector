from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import re
from urllib.parse import urlparse

app = FastAPI()

model = joblib.load('model.pkl')
vectorizer = joblib.load('vectorizer.pkl')
url_model = joblib.load('url_model.pkl')

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

def extract_url_features(url):
    parsed = urlparse(url)
    hostname = parsed.hostname or ''
    return [[
        len(url),
        url.count('.'),
        url.count('-'),
        1 if '@' in url else 0,
        1 if re.match(r'^(http|https)://\d+\.\d+\.\d+\.\d+', url) else 0,
        1 if url.startswith('https') else 0,
        sum(c.isdigit() for c in url),
        hostname.count('.'),
        1 if hostname.split('.')[-1] in ['tk', 'ga', 'ml', 'cf', 'xyz', 'icu', 'top', 'ru'] else 0,
    ]]

class URLRequest(BaseModel):
    url: str

@app.post('/predict-url')
def predict_url(req: URLRequest):
    features = extract_url_features(req.url)
    pred = url_model.predict(features)[0]
    prob = url_model.predict_proba(features)[0]
    confidence = round(max(prob) * 100, 2)

    return {
        "verdict": "Phishing" if pred == 1 else "Legitimate",
        "confidence": confidence
    }