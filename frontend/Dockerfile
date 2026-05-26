# -----------------------
# Base stage
# -----------------------
FROM node:22-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# -----------------------
# Development stage
# -----------------------
FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# -----------------------
# Build stage (production)
# -----------------------
FROM base AS build
RUN npm run build

# -----------------------
# Production stage (nginx)
# -----------------------
FROM nginx:alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]