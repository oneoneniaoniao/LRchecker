import { pool } from "./db";

/**
 * データベースを初期化します。
 *
 * この関数は以下を実行します:
 * - テーブルの作成（words, scores）
 * - インデックスの作成
 * - 初期データの投入（既存データがない場合のみ）
 *
 * 注意: Docker Composeを使用している場合、スキーマ変更時は以下のコマンドでDBをリセットできます:
 *   docker-compose down -v
 *   docker-compose up
 *
 * RESET_DB環境変数が設定されている場合、既存のテーブルを削除して再作成します。
 * 初期データは自動的に投入されます。
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

    // 初期データの投入（既存データがない場合のみ）
    const wordCountResult = await pool.query("SELECT COUNT(*) FROM words");
    const wordCount = parseInt(wordCountResult.rows[0].count, 10);

    if (wordCount === 0) {
      console.log("Inserting initial word data...");
      await pool.query(`
        INSERT INTO words (word1_text, word1_url, word2_text, word2_url)
        VALUES
          ('flee', 'audio/flee.mp3', 'free', 'audio/free.mp3'),
          ('light', 'audio/light.mp3', 'right', 'audio/right.mp3'),
          ('low', 'audio/low.mp3', 'row', 'audio/row.mp3'),
          ('glass', 'audio/glass.mp3', 'grass', 'audio/grass.mp3'),
          ('lack', 'audio/lack.mp3', 'rack', 'audio/rack.mp3'),
          ('blue', 'audio/alayna/blue.mp3', 'brew', 'audio/alayna/brew.mp3'),
          ('clap', 'audio/alayna/clap.mp3', 'crap', 'audio/alayna/crap.mp3'),
          ('glow', 'audio/alayna/glow.mp3', 'grow', 'audio/alayna/grow.mp3'),
          ('rub', 'audio/alayna/rub.mp3', 'love', 'audio/alayna/love.mp3'),
          ('lip', 'audio/alayna/lip.mp3', 'rip', 'audio/alayna/rip.mp3'),
          ('claw', 'audio/alayna/claw.mp3', 'craw', 'audio/alayna/craw.mp3'),
          ('load', 'audio/alayna/load.mp3', 'road', 'audio/alayna/road.mp3'),
          ('clown', 'audio/alayna/clown.mp3', 'crown', 'audio/alayna/crown.mp3')
      `);
      console.log("Initial word data inserted successfully!");
    } else {
      console.log(
        `Words table already contains ${wordCount} records. Skipping initial data insertion.`
      );
    }

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};
