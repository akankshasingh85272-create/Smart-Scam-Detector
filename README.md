# Smart Scam Detector System

An AI-based web application to detect scam messages, phishing emails and malicious URLs. Users can paste a suspicious message or link and instantly get a verdict — **Scam**, **Suspicious**, or **Safe** — along with a confidence score and the reasons behind the result.

Final Year B.Tech (CSE) Project — 8 Credits, 2026-27

## Features

- **Message Scanner** — check SMS, WhatsApp or email text for scam patterns
- **URL Checker** — detect phishing links using lexical and host-based features
- **Explainability** — shows the words/features that led to the verdict
- **Scan History** — view your past scans on a personal dashboard
- **Report a Scam** — flag scams the system missed, to improve the dataset
- **Authentication** — secure signup/login with hashed passwords and JWT

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas) with Mongoose |
| Machine Learning | Python, scikit-learn, TF-IDF, FastAPI |
| Auth | JWT, bcrypt |
| Version Control | Git & GitHub |

## Project Structure

\`\`\`
smart-scam-detector/
├── client/          # React frontend
├── server/          # Node + Express backend
├── ml-service/      # Python ML microservice
└── docs/            # Synopsis, diagrams, report
\`\`\`

## Getting Started

### Backend
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`
Create a `.env` file in `server/` with:
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
\`\`\`

### Frontend
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

## Team

| Name | Role |
|---|---|
| Akanksha | Team Lead — Backend, Authentication, ML integration |
| [Friend's Name] | Frontend, Dataset preparation, Testing |

## Status

🚧 Project in progress — built as part of final year coursework.