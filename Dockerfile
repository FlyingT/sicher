# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# We copy the files manually since we don't have node/npm in the host environment to do a build there
COPY package.json ./
# Note: Since we can't run npm install on the host, we rely on Docker to do it.
# This assumes the user has docker installed and will run the build.
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a simple nginx config if needed for SPA routing (optional but good practice)
# For this simple app, default nginx config is usually enough.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
