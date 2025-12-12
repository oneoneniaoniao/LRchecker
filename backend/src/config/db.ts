import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // `.env` ファイルの環境変数を読み込む

// RailwayやRenderなどのクラウドサービスではDATABASE_URLが提供されることが多い
// DATABASE_URLが設定されている場合はそれを使用、なければ個別の環境変数を使用
export const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes("sslmode=require")
          ? { rejectUnauthorized: false }
          : undefined,
      }
    : {
        host: process.env.DB_HOST || "db",
        port: parseInt(process.env.DB_PORT || "5432"),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      }
);
