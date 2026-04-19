# CodeArena — LeetCode Clone

A minimal LeetCode-style coding platform built as a DevOps-ready student project. Supports user authentication, problem browsing, code editing with Monaco Editor, code execution via self-hosted Judge0, and submission tracking.

**Zero cost infrastructure** — all services run locally via Docker.

---

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | React 18, Vite, TailwindCSS v3    |
| Backend        | Node.js, Express.js               |
| Database       | MongoDB (Docker container)        |
| Auth           | JWT + bcrypt                      |
| Code Editor    | Monaco Editor                     |
| Code Execution | Self-hosted Judge0 CE (Docker)    |
| Containers     | Docker + Docker Compose           |

---

## Features

- **Authentication** — Signup, login, JWT-based sessions
- **Problems Dashboard** — Search, filter by difficulty, solved status
- **Problem Detail** — Split view with description + code editor
- **Monaco Code Editor** — Syntax highlighting for C++, Python, Java, JavaScript
- **Code Execution** — Run code with custom input via Judge0
- **Submissions** — Submit solutions, run against test cases, store results
- **Profile Page** — Stats (submissions, accuracy, solved problems)

---

## Quick Start (Local Development)

### Prerequisites

- Node.js 18+
- MongoDB running locally (or via Docker)
- Docker Desktop (for Judge0)

### 1. Backend

```bash
cd backend
npm install
npm start
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Seed Problems

```bash
cd backend
npm run seed
```

### 4. Open Browser

Visit `http://localhost:5173`

---

## Docker Setup (Full Stack)
```Pull languages Docker images:
docker pull gcc
docker pull python
docker pull eclipse-temurin:17-jdk
docker pull node```

### Seed problems in Docker:

```bash
docker exec leetcode-backend node seed/seedProblems.js
```

---

## Project Structure

```
leetcode-clone/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route handlers
│   ├── middleware/       # JWT auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── seed/            # Sample problems
│   ├── services/        # Code runned by docker
│   ├── temp/            # folder to save code file temporarily
│   ├── server.js        # Entry point
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, CodeEditor, TestResults
│   │   ├── context/     # AuthContext
│   │   ├── pages/       # Login, Signup, Problems, Problem, Profile
│   │   ├── services/    # Axios API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## API Endpoints

### Auth
- `POST /api/auth/signup` — Register
- `POST /api/auth/login` — Login
- `GET /api/auth/profile` — Get profile (auth required)
- `GET /api/auth/stats` — Get profile stats (auth required)

### Problems
- `GET /api/problems` — List all problems
- `GET /api/problems/:id` — Get problem detail
- `POST /api/problems` — Create problem (auth required)
- `PUT /api/problems/:id` — Update problem (auth required)
- `DELETE /api/problems/:id` — Delete problem (auth required)

### Code Execution
- `POST /api/code/run` — Run code with custom input (auth required)

### Submissions
- `POST /api/submissions` — Submit solution (auth required)
- `GET /api/submissions/user/:userId` — User's submissions (auth required)
- `GET /api/submissions/problem/:problemId` — Problem submissions (auth required)

---

## Supported Languages

| Language   | Judge0 ID |
| ---------- | --------- |
| C++        | 54        |
| Python 3   | 71        |
| Java       | 62        |
| JavaScript | 63        |

---

## Environment Variables

See `.env.example` for all configuration options.

| Variable     | Default                                    | Description        |
| ------------ | ------------------------------------------ | ------------------ |
| PORT         | 5000                                       | Backend port       |
| MONGO_URI    | mongodb://localhost:27017/leetcode-clone    | MongoDB connection |
| JWT_SECRET   | (change in production)                     | JWT signing key    |
