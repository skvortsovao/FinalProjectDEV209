# Step 1: Use Node.js 20
FROM node:20 AS build
WORKDIR /app

# Set Node.js environment to development
ENV NODE_ENV=development

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies)
RUN npm install --include=dev --legacy-peer-deps

# 🔹 Manually Install Vite (Forces Vite installation)
RUN npm install -g vite

# Debugging: Check Vite installation
RUN ls -la node_modules/.bin/
RUN npm list vite || echo "❌ Vite is NOT installed!"

# Copy the rest of the app files
COPY . .

# Run the Vite build step
RUN npm run build

# Step 2: Use Nginx to serve the built React app
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
