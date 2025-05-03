# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=16.20.2
FROM node:${NODE_VERSION}-slim

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Copy application code
COPY . .

# Install dependencies
RUN npm install

# Expose multiple ports
EXPOSE 3000 3001

# Run the application and the server
CMD ["sh", "-c", "npm run server & npm run start"]