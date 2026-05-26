# FOBOH Engineering Challenge

Monorepo with a **Node.js + TypeScript** API (`/backend`) and a **React + TypeScript** UI (`/frontend`), orchestrated with Docker Compose.

## Run with Docker

From the repository root:

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API (direct): http://localhost:3001/api/health

The frontend nginx container proxies `/api/*` to the backend service.

## Local development (without Docker)

**Backend**

```bash
cd backend
npm install
npm run dev
```

**Frontend** (in another terminal)

```bash
cd frontend
npm install
npm run dev
```

Vite dev server runs at http://localhost:5173 and proxies `/api` to the backend on port 3001.

## Project layout

```
backend/     Express API (TypeScript)
frontend/    React app (Vite + TypeScript)
docker-compose.yml
```
