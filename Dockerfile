# Stage 1: Build Stage --------------------------------------
FROM node:21-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production Stage --------------------------------------
FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=build /app/dist .

EXPOSE 80

CMD ["node", "main"]
