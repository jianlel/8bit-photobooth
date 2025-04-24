# 1. Use official image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy relevant dependencies to cache
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of app
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Expose port Next.js uses
EXPOSE 3000

# 8. Start app 
CMD ["npm", "run", "start"]