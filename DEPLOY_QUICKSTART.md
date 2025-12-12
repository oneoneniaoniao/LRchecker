# デプロイ クイックスタート

## 最も簡単な方法: Docker Compose

### 1. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成：

```bash
cat > .env << 'EOF'
POSTGRES_DB=lrchecker
POSTGRES_USER=postgres
POSTGRES_PASSWORD=change_this_password
BACKEND_PORT=5001
FRONTEND_URL=http://localhost:3000
WEB_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:5001
EOF
```

### 2. デプロイ実行

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### 3. 確認

- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:5001

### 4. ログ確認

```bash
docker-compose -f docker-compose.prod.yml logs -f
```

### 5. 停止

```bash
docker-compose -f docker-compose.prod.yml down
```

## 本番環境での注意点

1. **パスワード変更**: `POSTGRES_PASSWORD` を強力なパスワードに変更
2. **ドメイン設定**: `FRONTEND_URL` と `NEXT_PUBLIC_API_URL` を実際のドメインに設定
3. **HTTPS**: リバースプロキシ（Nginx等）を使用してHTTPSを有効化

詳細は [DEPLOY.md](./DEPLOY.md) を参照してください。

