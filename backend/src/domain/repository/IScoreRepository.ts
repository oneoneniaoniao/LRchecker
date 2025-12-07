import { Score } from "../model/Score";

export interface IScoreRepository {
  save(playerName: string, score: number): Promise<Score>;
  findTop(count: number): Promise<Score[]>;
}
