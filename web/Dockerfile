FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]