# Dockerfile
FROM golang:1.23-alpine

WORKDIR /app

# airをインストール（ホットリロード用）
RUN go install github.com/air-verse/air@v1.61.5

# 依存関係をコピーしてインストール
COPY go.mod go.sum* ./
RUN go mod download

# ソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 5001

# 開発モードで実行（airを使用）
CMD ["air", "-c", ".air.toml"]