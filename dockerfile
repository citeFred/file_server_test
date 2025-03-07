# Node.js version
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Build the application (if necessary)
RUN npm run build

# Run the application
CMD ["npm", "run", "start"]

# Port that the container will use (modify if necessary)
EXPOSE 3000
