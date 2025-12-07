export interface ScoreDTO {
  id: number;
  playerName: string;
  score: number;
  createdAt: Date;
}

export interface IScoreUseCase {
  saveScore(playerName: string, score: number): Promise<ScoreDTO>;
  getTopScores(count: number): Promise<ScoreDTO[]>;
}
