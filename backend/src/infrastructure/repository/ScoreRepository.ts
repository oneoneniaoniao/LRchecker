import { pool } from "@/config/db";
import { IScoreRepository } from "@/domain/repository/IScoreRepository";
import { Score } from "@/domain/model/Score";
import { ScoreRow } from "@/domain/model/ScoreRow";
import { QueryResult } from "pg";

class ScoreRepository implements IScoreRepository {
  async save(playerName: string, score: number): Promise<Score> {
    try {
      const result: QueryResult<ScoreRow> = await pool.query<ScoreRow>(
        "INSERT INTO scores (player_name, score) VALUES ($1, $2) RETURNING *",
        [playerName, score]
      );

      return this.toDomainModel(result.rows[0]);
    } catch (error) {
      console.error("Database error in ScoreRepository.save:", error);
      throw error;
    }
  }

  async findTop(count: number): Promise<Score[]> {
    const result: QueryResult<ScoreRow> = await pool.query<ScoreRow>(
      "SELECT * FROM scores ORDER BY score DESC, created_at DESC LIMIT $1",
      [count]
    );

    return result.rows.map((row) => this.toDomainModel(row));
  }

  private toDomainModel(row: ScoreRow): Score {
    return new Score(row.id, row.player_name, row.score, row.created_at);
  }
}

export const scoreRepository = new ScoreRepository();
