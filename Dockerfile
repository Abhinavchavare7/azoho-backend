# 1. Use Node.js as the base image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application files to the container
COPY . .

# 6. Build the NestJS app (TypeScript -> JavaScript)
RUN npm run build

# 7. Expose the port that your app will run on
EXPOSE 3000

# 8. Define the default command to run when the container starts
CMD ["npm", "run", "start:prod"]
