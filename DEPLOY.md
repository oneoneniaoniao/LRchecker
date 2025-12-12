# デプロイ手順

このドキュメントでは、LR Checkerアプリケーションをデプロイする方法を説明します。

## 前提条件

- Docker と Docker Compose がインストールされていること
- サーバーまたはクラウド環境へのアクセス権限

## デプロイ方法

### 方法1: Docker Compose を使用したデプロイ（推奨）

#### 1. サーバーへの準備

```bash
# リポジトリをクローン
git clone <repository-url>
cd LRchecker

# 環境変数ファイルを作成
cp .env.example .env
```

#### 2. 環境変数の設定

`.env` ファイルを編集して、本番環境に合わせて設定してください：

```env
# データベース設定（強力なパスワードに変更）
POSTGRES_DB=lrchecker
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password_here

# バックエンド設定
BACKEND_PORT=5001
FRONTEND_URL=https://your-domain.com

# フロントエンド設定
WEB_PORT=3000
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

**重要**: 本番環境では、`FRONTEND_URL` と `NEXT_PUBLIC_API_URL` を実際のドメインに設定してください。

#### 3. デプロイの実行

```bash
# 本番用のDocker Composeでビルドと起動
docker-compose -f docker-compose.prod.yml up -d --build
```

#### 4. ログの確認

```bash
# すべてのサービスのログを確認
docker-compose -f docker-compose.prod.yml logs -f

# 特定のサービスのログを確認
docker-compose -f docker-compose.prod.yml logs -f web
docker-compose -f docker-compose.prod.yml logs -f backend
```

#### 5. サービスの停止

```bash
docker-compose -f docker-compose.prod.yml down
```

#### 6. データベースのバックアップ

```bash
# データベースのバックアップ
docker-compose -f docker-compose.prod.yml exec db pg_dump -U postgres lrchecker > backup.sql

# データベースの復元
docker-compose -f docker-compose.prod.yml exec -T db psql -U postgres lrchecker < backup.sql
```

### 方法2: リバースプロキシを使用したデプロイ

本番環境では、Nginx や Traefik などのリバースプロキシを使用することを推奨します。

#### Nginx の設定例

```nginx
# /etc/nginx/sites-available/lrchecker
server {
    listen 80;
    server_name your-domain.com;

    # フロントエンド
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # バックエンドAPI
    location /api {
        rewrite ^/api/(.*) /$1 break;
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

この場合、環境変数を以下のように設定：

```env
FRONTEND_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

### 方法3: クラウドサービスへのデプロイ

#### Vercel (フロントエンド) + Railway/Render (バックエンド)

**フロントエンド (Vercel):**

1. [Vercel](https://vercel.com) にアカウントを作成
2. GitHubリポジトリを接続
3. プロジェクト設定で以下を設定：
   - Root Directory: `web`
   - Build Command: `yarn build`
   - Output Directory: `.next`
   - Environment Variables:
     - `NEXT_PUBLIC_API_URL`: バックエンドのURL

**バックエンド (Railway/Render):**

1. [Railway](https://railway.app) または [Render](https://render.com) にアカウントを作成
2. 新しいPostgreSQLデータベースを作成
3. 新しいWebサービスを作成：
   - Root Directory: `backend`
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Environment Variables:
     - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`: データベース接続情報
     - `FRONTEND_URL`: VercelのURL
     - `PORT`: 5001

## トラブルシューティング

### データベース接続エラー

- 環境変数が正しく設定されているか確認
- データベースコンテナが起動しているか確認: `docker-compose -f docker-compose.prod.yml ps`

### CORS エラー

- `FRONTEND_URL` が正しく設定されているか確認
- ブラウザのコンソールでエラーメッセージを確認

### ビルドエラー

- ログを確認: `docker-compose -f docker-compose.prod.yml logs`
- キャッシュをクリアして再ビルド: `docker-compose -f docker-compose.prod.yml build --no-cache`

## セキュリティのベストプラクティス

1. **強力なパスワード**: データベースのパスワードは強力なものに設定
2. **HTTPS**: 本番環境では必ずHTTPSを使用
3. **環境変数**: 機密情報は環境変数で管理し、`.env` ファイルをGitにコミットしない
4. **ファイアウォール**: 不要なポートを公開しない
5. **定期的なバックアップ**: データベースの定期的なバックアップを実施

## 更新手順

```bash
# 最新のコードを取得
git pull

# 再ビルドと再起動
docker-compose -f docker-compose.prod.yml up -d --build

# データベースマイグレーションが必要な場合
docker-compose -f docker-compose.prod.yml exec backend npm run migrate
```
