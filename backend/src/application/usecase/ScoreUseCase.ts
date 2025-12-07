import { IScoreUseCase, ScoreDTO } from "@/application/usecase/IScoreUseCase";
import { IScoreRepository } from "@/domain/repository/IScoreRepository";

export class ScoreUseCase implements IScoreUseCase {
  constructor(private scoreRepository: IScoreRepository) {}

  async saveScore(playerName: string, score: number): Promise<ScoreDTO> {
    const savedScore = await this.scoreRepository.save(playerName, score);
    return {
      id: savedScore.id,
      playerName: savedScore.playerName,
      score: savedScore.score,
      createdAt: savedScore.createdAt,
    };
  }

  async getTopScores(count: number): Promise<ScoreDTO[]> {
    const scores = await this.scoreRepository.findTop(count);
    return scores.map((score) => ({
      id: score.id,
      playerName: score.playerName,
      score: score.score,
      createdAt: score.createdAt,
    }));
  }
}
