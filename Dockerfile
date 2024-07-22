# Use an official Node.js runtime as a base image
FROM node:20.15-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

# Use a smaller base image for production
FROM nginx:alpine

# Copy build files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000
EXPOSE 3000

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
