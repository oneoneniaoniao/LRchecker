FROM node:18-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY ./src ./src
COPY ./tsconfig.json ./
COPY ./audio ./audio
RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

# 本番用の依存関係のみをインストール（スクリプトを無視）
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

# ビルド済みファイルと必要なファイルをコピー
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/audio ./audio

EXPOSE 5001

CMD ["npm", "start"]

