# Dockerfile
FROM golang:1.22-alpine

WORKDIR /app

# 依存関係をコピーしてインストール
COPY go.mod go.sum* ./
RUN go mod download

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN go build -o main .

# 静的ファイルをコピー
COPY audio ./audio

# ポートを公開
EXPOSE 5001

# アプリケーションを実行
CMD ["./main"]