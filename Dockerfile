# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY apps/mentor/package.json apps/mentor/
COPY apps/mentee/package.json apps/mentee/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create .env files for both apps
ARG VITE_API_BASE_URL=http://100.50.98.194:8089
ARG VITE_API_VERSION=/api/v1

RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > apps/mentor/.env && \
    echo "VITE_API_VERSION=${VITE_API_VERSION}" >> apps/mentor/.env && \
    echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > apps/mentee/.env && \
    echo "VITE_API_VERSION=${VITE_API_VERSION}" >> apps/mentee/.env

# Build both apps
RUN npm run build:mentee && npm run build:mentor

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/apps/mentee/dist /usr/share/nginx/html/mentee
COPY --from=builder /app/apps/mentor/dist /usr/share/nginx/html/mentor

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]