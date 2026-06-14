# 🌍 Earthius Backend

The backend service for **Earthius**, a locally powered AI assistant built with FastAPI and Ollama.

---

## 🚀 Tech Stack

- Python 3.13+
- FastAPI
- Uvicorn
- Ollama
- Pydantic
- REST API

---

## 📂 Project Structure

```
backend/
│
├── app/
│   ├── api/
│   │   ├── chat.py
│   │   ├── health.py
│   │   └── schemas.py
│   │
│   ├── core/
│   │   └── system_prompt.py
│   │
│   ├── services/
│   │   └── chat_service.py
│   │
│   ├── utils/
│   │
│   └── main.py
│
├── requirements.txt
└── README.md
```

---

# Features

- Local AI inference using Ollama
- FastAPI REST API
- Modular architecture
- Health check endpoint
- Chat endpoint
- Pydantic request validation
- Easily extendable service layer

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate virtual environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# Running the Server

Start the FastAPI server

```bash
uvicorn app.main:app --reload
```

Server

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

# API Endpoints

## Health Check

```
GET /health
```

Response

```json
{
  "status": "ok"
}
```

---

## Chat

```
POST /chat
```

Request

```json
{
  "message": "Hello Earthius"
}
```

Response

```json
{
  "response": "Hello! How can I help you today?"
}
```

---

# Architecture

```
Client

    │

    ▼

FastAPI

    │

    ▼

Service Layer

    │

    ▼

Ollama

    │

    ▼

Language Model
```

---

# Development Principles

- Modular architecture
- Clean API design
- Separation of concerns
- Reusable services
- Scalable project structure

---

# Current Status

## Completed

- FastAPI setup
- REST API
- Ollama integration
- Chat endpoint
- Health endpoint
- Frontend connectivity

---

## Upcoming

- Conversation persistence
- Document processing
- Retrieval pipeline
- Streaming responses
- User settings

---

# License

This project is intended for educational and personal development purposes.