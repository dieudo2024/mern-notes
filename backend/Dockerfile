FROM node:22-bookworm
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
EXPOSE 5000
CMD ["npm", "start"]
