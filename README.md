# FOBOH Engineering Challenge

# Frontend README
Frontend application for the FOBOH Engineering Challenge.
Built with React, TypeScript, Tailwind CSS, and Vite.

## Setup
```
git clone https://github.com/linklin830912/FOBOH_Engineering_Challenge.git
cd FOBOH_Engineering_Challenge/frontend
npm install
npm run dev
```
## Run on
http://localhost:5173

## Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Axios

---

## Project Structure

```bash
src/
├── api/                # API request functions
├── components/         # Shared reusable UI components
├── pages/              # Route pages
├── layouts/            # Layout components
├── types/              # Shared TypeScript types
├── mocks/              # Mock data
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── main.tsx
```

# Backend README
Backend API service for the FOBOH Engineering Challenge.
Built with Node.js, Express, TypeScript, and Prisma-style relational architecture.

## Setup
```
git clone https://github.com/linklin830912/FOBOH_Engineering_Challenge.git
cd FOBOH_Engineering_Challenge/frontend
npm install
npm run dev
```
## Run on
http://localhost:5173

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma schema design
- REST API architecture
- Swagger/OpenAPI
- In-memory mock database

---

## Project Structure

```bash
src/
├── controllers/        # Route controllers
├── routes/             # Express route definitions
├── services/           # Business logic
├── data/               # Mock in-memory data
├── types/              # Shared TypeScript types
├── utils/              # Utility helpers
├── swagger/            # Swagger configuration
├── middleware/         # Express middleware
└── server.ts