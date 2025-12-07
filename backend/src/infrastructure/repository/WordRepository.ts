import { pool } from "@/config/db";
import { IWordRepository } from "@/domain/repository/IWordRepository";
import { Word } from "@/domain/model/Word";
import { WordRow } from "@/domain/model/WordRow";
import { QueryResult } from "pg"; // node-postgres の型を使用する場合

class WordRepository implements IWordRepository {
  async findRandom(): Promise<Word | null> {
    const result: QueryResult<WordRow> = await pool.query<WordRow>(
      "SELECT * FROM words ORDER BY RANDOM() LIMIT 1",
    );

    if (!result.rows[0]) return null;
    return this.toDomainModel(result.rows[0]);
  }

  private toDomainModel(row: WordRow): Word {
    return new Word(
      row.id,
      row.word1_text,
      row.word1_url,
      row.word2_text,
      row.word2_url,
    );
  }
}

export const wordRepository = new WordRepository();
