# ==========================================
# Multi-Stage Dockerfile for React Frontend
# CDAC Project Deployment Standard
# ==========================================

# STAGE 1: Build Phase
FROM node:20-alpine AS build
WORKDIR /app

# Copy package definitions and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build production bundle
COPY . .
RUN npm run build

# STAGE 2: Production Web Server Phase (Nginx)
FROM nginx:alpine

# Copy built static files from build stage to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx SPA routing configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose web server port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
