# Use Node.js 18 as the base image
FROM node:18

#set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies 
RUN npm Install

# Copy the rest of backend code
COPY ..

# Expose the backend port 
EXPOSE 3000

# Start the backend
CMD ['npm','start']