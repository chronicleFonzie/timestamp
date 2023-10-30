# Build stage
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
# Copy other project files and build the project (your case might not have a build step)
COPY . .

# Production stage
FROM node:14-alpine
WORKDIR /app
# Copy needed files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/index.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/views ./views
# Install only production dependencies
RUN npm install --only=production
# Expose the port the app will run on
EXPOSE 3001
# Run the application
CMD ["npm", "start"]
