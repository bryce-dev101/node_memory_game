# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /home/psykiller/dev/node_memory_game

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]