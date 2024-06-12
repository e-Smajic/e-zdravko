# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Install 'http-server' to serve the build directory
RUN npm install -g http-server

# Expose port 8081 to the outside world
EXPOSE 8081

# Command to run the app
CMD ["http-server", "build", "-p", "8081"]
