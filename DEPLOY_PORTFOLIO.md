# ポートフォリオ用デプロイガイド 🚀

ポートフォリオ用アプリとして、**無料で簡単にデプロイ**できる方法を紹介します。

## 🎯 おすすめ構成

### **Vercel (フロントエンド) + Railway (バックエンド + DB)**

**理由:**

- ✅ **完全無料**（ポートフォリオ用途なら十分）
- ✅ **セットアップが簡単**（数分で完了）
- ✅ **自動デプロイ**（GitHubにプッシュするだけ）
- ✅ **カスタムドメイン対応**（無料）
- ✅ **HTTPS自動設定**

---

## ⚡ クイックスタート（5分でデプロイ）

### 1. Railway でバックエンド + DB をセットアップ

1. [Railway](https://railway.app) にGitHubでサインアップ
2. **New Project** → **Add PostgreSQL** でDB作成
3. **New** → **GitHub Repo** でリポジトリを選択
4. 設定：
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. 環境変数を追加（**DATABASE_URLを使用する方法が簡単です**）：

   **推奨: DATABASE_URLを使用**

   ```env
   PORT=5001
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   FRONTEND_URL=https://your-app.vercel.app
   ```

   **または個別の環境変数を使用**

   ```env
   PORT=5001
   DB_HOST=${{Postgres.PGHOST}}
   DB_PORT=${{Postgres.PGPORT}}
   DB_USER=${{Postgres.PGUSER}}
   DB_PASS=${{Postgres.PGPASSWORD}}
   DB_NAME=${{Postgres.PGDATABASE}}
   FRONTEND_URL=https://your-app.vercel.app
   ```

6. デプロイ後、URLをメモ（例: `https://xxx.railway.app`）

### 2. Vercel でフロントエンドをセットアップ

1. [Vercel](https://vercel.com) にGitHubでサインアップ
2. **Add New Project** → リポジトリを選択
3. 設定：
   - Framework: Next.js
   - Root Directory: `web`
4. 環境変数を追加：
   ```
   NEXT_PUBLIC_API_URL=https://xxx.railway.app
   ```
5. デプロイ

### 3. データベースの初期化

**自動実行されます！** 🎉

バックエンドが起動すると、`backend/src/config/initDb.ts` が自動的に以下を実行します：

- テーブルの作成
- インデックスの作成
- 初期データの投入（13個の単語ペア）

手動でのデータ投入は不要です。

### 4. バックエンドの環境変数を更新

Railwayのバックエンドサービスで、`FRONTEND_URL` をVercelのURLに更新

**完了！** 🎉

---

## 📋 デプロイ手順

### Step 1: バックエンド + データベースを Railway にデプロイ

#### 1-1. Railway アカウント作成

1. [Railway](https://railway.app) にアクセス
2. GitHubアカウントでサインアップ（無料）

#### 1-2. PostgreSQL データベースを作成

1. Railwayダッシュボードで **"New Project"** をクリック
2. **"Add PostgreSQL"** を選択
3. データベースが作成されたら、**"Variables"** タブで接続情報を確認
   - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` が自動生成されます

#### 1-3. バックエンドをデプロイ

1. 同じプロジェクトで **"New"** → **"GitHub Repo"** を選択
2. リポジトリを選択
3. **"Settings"** で以下を設定：

   **Root Directory:** `backend`

   **Build Command:** `npm install && npm run build`

   **Start Command:** `npm start`

4. **"Variables"** タブで環境変数を追加：

   **方法1: DATABASE_URLを使用（推奨・簡単）**

   RailwayはPostgreSQLサービスを追加すると、自動的に`DATABASE_URL`環境変数を提供します。
   以下の環境変数を追加してください：

   ```env
   PORT=5001
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   FRONTEND_URL=https://your-app-name.vercel.app
   ```

   **方法2: 個別の環境変数を使用**

   ```env
   PORT=5001
   DB_HOST=${{Postgres.PGHOST}}
   DB_PORT=${{Postgres.PGPORT}}
   DB_USER=${{Postgres.PGUSER}}
   DB_PASS=${{Postgres.PGPASSWORD}}
   DB_NAME=${{Postgres.PGDATABASE}}
   FRONTEND_URL=https://your-app-name.vercel.app
   ```

   ⚠️ **重要**: `FRONTEND_URL` は後でVercelのURLに更新します

5. **"Deploy"** をクリックしてデプロイ開始
6. デプロイ完了後、**"Settings"** → **"Generate Domain"** でURLを取得
   - 例: `https://lrchecker-backend-production.up.railway.app`
   - このURLをメモしておきます

#### 1-4. データベースの初期化

**自動実行（推奨）**

バックエンドが起動すると、`backend/src/config/initDb.ts` が自動的に以下を実行します：

- テーブルの作成（words, scores）
- インデックスの作成
- 初期データの投入（既存データがない場合のみ）

そのため、**手動でのデータ投入は不要**です。バックエンドをデプロイすれば、自動的にデータベースが初期化されます。

---

### Step 2: フロントエンドを Vercel にデプロイ

#### 2-1. Vercel アカウント作成

1. [Vercel](https://vercel.com) にアクセス
2. GitHubアカウントでサインアップ（無料）

#### 2-2. プロジェクトをインポート

1. **"Add New..."** → **"Project"** をクリック
2. GitHubリポジトリを選択
3. プロジェクト設定：

   **Framework Preset:** Next.js

   **Root Directory:** `web`

   **Build Command:** `yarn build` (または `npm run build`)

   **Output Directory:** `.next` (自動検出される)

#### 2-3. 環境変数を設定

**"Environment Variables"** セクションで以下を追加：

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

⚠️ **重要**: Railwayで取得したバックエンドのURLを設定

#### 2-4. デプロイ

1. **"Deploy"** をクリック
2. デプロイ完了後、URLが生成されます
   - 例: `https://lrchecker.vercel.app`

#### 2-5. バックエンドの環境変数を更新

Railwayに戻って、バックエンドの環境変数を更新：

```
FRONTEND_URL=https://your-app-name.vercel.app
```

これでCORSエラーが解消されます。

---

## 🔄 自動デプロイの設定

GitHubにプッシュするだけで自動デプロイされます：

- **Vercel**: 自動で検知してデプロイ
- **Railway**: デフォルトで自動デプロイ有効

---

## 🌐 カスタムドメインの設定（オプション）

### Vercel（フロントエンド）

1. プロジェクトの **"Settings"** → **"Domains"**
2. ドメインを追加
3. DNS設定を案内に従って設定

### Railway（バックエンド）

1. サービスの **"Settings"** → **"Networking"**
2. **"Custom Domain"** を設定

---

## 💰 料金について

### 無料枠

- **Vercel**:
  - 個人プロジェクト: 無制限
  - 帯域幅: 100GB/月
  - ビルド: 6000分/月

- **Railway**:
  - $5分のクレジット/月（無料）
  - ポートフォリオ用途なら十分

### 注意点

- Railwayは使用量に応じて課金される場合がありますが、ポートフォリオ用途なら無料枠で十分です
- 長時間アクセスがないとスリープする場合があります（初回アクセスで起動）

---

## 🐛 トラブルシューティング

### CORS エラー

- Railwayのバックエンドで `FRONTEND_URL` が正しく設定されているか確認
- VercelのURLと完全に一致しているか確認（`https://` を含む）

### データベース接続エラー

- Railwayの環境変数で `${{Postgres.PGHOST}}` などの形式が正しいか確認
- データベースが起動しているか確認

### ビルドエラー

- **Vercel**: ログを確認して、依存関係の問題をチェック
- **Railway**: ログを確認して、ビルドコマンドが正しいか確認

---

## 📝 チェックリスト

デプロイ前の確認：

- [ ] GitHubリポジトリが公開されている（またはVercel/Railwayにアクセス権限がある）
- [ ] `backend/db/init.sql` が正しく設定されている
- [ ] 環境変数が正しく設定されている
- [ ] バックエンドのURLが取得できている
- [ ] フロントエンドの環境変数にバックエンドURLが設定されている
- [ ] バックエンドの環境変数にフロントエンドURLが設定されている

---

## 🎉 完了！

デプロイが完了したら、以下のURLでアクセスできます：

- **フロントエンド**: `https://your-app.vercel.app`
- **バックエンドAPI**: `https://your-backend.railway.app`

ポートフォリオに載せる準備ができました！

---

## 🔄 更新方法

コードを更新する場合：

1. ローカルで変更をコミット
2. GitHubにプッシュ
3. VercelとRailwayが自動でデプロイ

簡単です！
