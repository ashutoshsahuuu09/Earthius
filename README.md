# 🌍 Earthius

> A local AI assistant built with FastAPI, React, and Ollama.

Earthius is an AI application focused on providing a fast, private, and local-first chat experience powered by open-source language models.

> 🚧 This project is currently under active development.

---

## ✨ Features

- Local AI Chat
- FastAPI Backend
- Ollama Integration
- REST API
- Modular Architecture
- Interactive API Documentation

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- Python

### AI
- Ollama
- Gemma 2B

---

## 📁 Project Structure

```
Earthius/
│
├── backend/
├── frontend/
├── docs/
└── README.md
```

---

## 🚀 Getting Started

### Clone

```bash
git clone https://github.com/yourusername/Earthius.git
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Server:

```
http://127.0.0.1:8000
```

API Docs:

```
http://127.0.0.1:8000/docs
```

---

## Current Progress

### Completed

- Project Setup
- Ollama Integration
- Local AI Chat
- FastAPI Backend
- Chat API
- Health API

### In Progress

- React Frontend
- Chat Interface
- Session Management

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Welcome endpoint |
| GET | `/health` | Health status |
| POST | `/chat` | Chat with Earthius |

---

## Screenshots

> Coming Soon

---

## Contributing

Contributions and suggestions are welcome.

---

## License

MIT License
