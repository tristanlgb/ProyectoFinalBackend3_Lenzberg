FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Exclude unnecessary files
COPY .dockerignore .

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["node", "src/app.js"]
