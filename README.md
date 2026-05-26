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

# Design Schema

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# ----------------------
# ENUMS
# ----------------------

enum AdjustmentType {
  FIXED
  PERCENTAGE
}

enum AdjustmentDirection {
  INCREASE
  DECREASE
}

# ----------------------
# CORE MODELS
# ----------------------

model Product {
  id          String   @id @default(uuid())
  title       String
  sku         String   @unique
  brand       String
  subCategory String
  segment     String
  price       Float

  pricingProfiles PricingProfileProduct[]
}

model Customer {
  id        String   @id @default(uuid())
  name      String

  groupId   String
  group     CustomerGroup @relation(fields: [groupId], references: [id])

  pricingProfiles PricingProfileCustomer[]
}

model CustomerGroup {
  id        String   @id @default(uuid())
  name      String   @unique

  customers Customer[]
}

model PricingProfile {
  id        String   @id @default(uuid())
  name      String

  adjustmentType     AdjustmentType
  direction          AdjustmentDirection
  value              Float

  priority   Int      @default(0)
  isActive   Boolean  @default(true)

  products   PricingProfileProduct[]
  customers  PricingProfileCustomer[]

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

# ----------------------
# JOIN TABLES (M2M)
# ----------------------

model PricingProfileProduct {
  pricingProfileId String
  productId        String

  pricingProfile PricingProfile @relation(fields: [pricingProfileId], references: [id])
  product        Product        @relation(fields: [productId], references: [id])

  @@id([pricingProfileId, productId])
}

model PricingProfileCustomer {
  pricingProfileId String
  customerId       String

  pricingProfile PricingProfile @relation(fields: [pricingProfileId], references: [id])
  customer       Customer       @relation(fields: [customerId], references: [id])

  @@id([pricingProfileId, customerId])
}

```