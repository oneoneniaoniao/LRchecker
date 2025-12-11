# LR Checker

似ている英語の発音を聞き分けるゲームアプリケーション

## 技術スタック

### フロントエンド

- **Next.js 14** (React 18)
- **TypeScript**
- **Tailwind CSS**

### バックエンド

- **Express.js**
- **TypeScript**
- **PostgreSQL**
- **node-postgres (pg)**

### インフラ

- **Docker Compose**

## セットアップ

### 必要な環境

- Docker & Docker Compose
- Node.js (開発時のみ、Docker内でも実行可能)

### 初回セットアップ

1. リポジトリをクローン

```bash
git clone <repository-url>
cd LRchecker
```

2. Docker Composeでサービスを起動

```bash
docker-compose up
```

これで以下のサービスが起動します：

- **Web**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **PostgreSQL**: localhost:5432

## 開発

### 開発環境の起動

```bash
docker-compose up
```

### 開発環境の停止

```bash
docker-compose down
```

### データベースのリセット

スキーマ変更時や、データベースを完全にリセットしたい場合：

```bash
docker-compose down -v  # ボリュームも削除
docker-compose up        # 再起動時にinit.sqlが自動実行される
```

**注意**: `-v` オプションを付けると、データベースのボリュームが削除され、次回起動時に `backend/db/init.sql` が自動実行されます。これにより、テーブルと初期データが再作成されます。

### データベースの初期化について

- **スキーマ定義と初期データ**: `backend/db/init.sql` に定義されています
- **自動実行**: PostgreSQLコンテナの初回起動時に `/docker-entrypoint-initdb.d/init.sql` として自動実行されます
- **アプリ起動時の処理**: `backend/src/config/initDb.ts` でテーブルの存在確認と作成を行います（存在しない場合のみ作成）

### スキーマ変更時の手順

1. `backend/db/init.sql` を編集してスキーマを変更
2. データベースをリセット:
   ```bash
   docker-compose down -v
   docker-compose up
   ```
3. これで新しいスキーマでテーブルが再作成されます

## 環境変数

### バックエンド

`.env` ファイルを作成（オプション、デフォルト値が設定済み）:

```env
PORT=5001
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=lrchecker
FRONTEND_URL=http://localhost:3000
```

## API エンドポイント

### Words

- `GET /word/random` - ランダムな単語ペアを取得

### Scores

- `GET /score` - スコアランキングを取得
- `POST /score` - スコアを登録
