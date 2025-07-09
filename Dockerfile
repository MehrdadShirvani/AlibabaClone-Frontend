# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy only the frontend folder contents
COPY ./alibabaclone-frontend/ .

# Install dependencies
RUN npm install

# Build with the provided VITE_API_URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]