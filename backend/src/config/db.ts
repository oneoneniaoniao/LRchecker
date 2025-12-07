import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // `.env` ファイルの環境変数を読み込む

export const pool = new Pool({
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
