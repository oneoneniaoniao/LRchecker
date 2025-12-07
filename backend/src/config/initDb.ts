import { pool } from "./db";

export const initializeDatabase = async (): Promise<void> => {
  try {
    // scoresテーブルが存在するか確認
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'scores'
      );
    `);

    if (!tableExists.rows[0].exists) {
      console.log("Creating scores table...");
      await pool.query(`
        CREATE TABLE scores (
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

      console.log("Scores table created successfully!");
    } else {
      console.log("Scores table already exists. Checking schema...");
      
      // player_nameカラムが存在するか確認
      const columnExists = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'scores' 
          AND column_name = 'player_name'
        );
      `);

      if (!columnExists.rows[0].exists) {
        console.log("player_name column does not exist. Recreating scores table...");
        
        // 古いテーブルを削除
        await pool.query(`DROP TABLE IF EXISTS scores CASCADE;`);
        
        // 新しいテーブルを作成
        await pool.query(`
          CREATE TABLE scores (
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

        console.log("Scores table recreated successfully with player_name column!");
      } else {
        console.log("Scores table schema is correct.");
      }
    }
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

