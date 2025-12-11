import { pool } from "./db";

/**
 * データベースを初期化します。
 *
 * 注意: スキーマ定義と初期データは backend/db/init.sql に定義されています。
 * Docker Composeを使用している場合、スキーマ変更時は以下のコマンドでDBをリセットできます:
 *   docker-compose down -v
 *   docker-compose up
 *
 * RESET_DB環境変数が設定されている場合、既存のテーブルを削除して再作成します。
 * この場合、初期データは init.sql からは投入されないため、手動で投入する必要があります。
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    const shouldReset = process.env.RESET_DB === "true";

    if (shouldReset) {
      console.log("Resetting database...");

      // 既存のテーブルを削除（CASCADEで依存関係も削除）
      await pool.query(`DROP TABLE IF EXISTS scores CASCADE;`);
      await pool.query(`DROP TABLE IF EXISTS words CASCADE;`);

      console.log("Existing tables dropped.");
    }

    // wordsテーブルを作成
    await pool.query(`
      CREATE TABLE IF NOT EXISTS words (
        id SERIAL PRIMARY KEY,
        word1_text TEXT NOT NULL,
        word1_url TEXT NOT NULL,
        word2_text TEXT NOT NULL,
        word2_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );
    `);

    // scoresテーブルを作成
    await pool.query(`
      CREATE TABLE IF NOT EXISTS scores (
        id SERIAL PRIMARY KEY,
        player_name TEXT NOT NULL,
        score INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT now()
      );
    `);

    // インデックスを作成
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_scores_score ON scores(score DESC);
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_scores_created_at ON scores(created_at DESC);
    `);

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};
