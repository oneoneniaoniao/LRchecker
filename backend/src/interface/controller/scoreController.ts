import { Request, Response } from "express";
import { IScoreUseCase } from "@/application/usecase/IScoreUseCase";

export class ScoreController {
  private scoreUseCase: IScoreUseCase;

  constructor(scoreUseCase: IScoreUseCase) {
    this.scoreUseCase = scoreUseCase;
  }

  public async saveScore(req: Request, res: Response): Promise<Response> {
    try {
      const { playerName, score } = req.body;

      if (
        !playerName ||
        typeof playerName !== "string" ||
        playerName.trim().length === 0
      ) {
        return res.status(400).json({ message: "Invalid player name" });
      }

      if (typeof score !== "number" || score <= 0) {
        return res
          .status(400)
          .json({
            message: "Invalid score value. Score must be greater than 0.",
          });
      }

      // プレイヤー名の最大長を制限（20文字）
      const trimmedName = playerName.trim().substring(0, 20);

      const savedScore = await this.scoreUseCase.saveScore(trimmedName, score);
      return res.status(201).json(savedScore);
    } catch (error) {
      console.error("Error in saveScore controller:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: `Internal server error: ${errorMessage}` });
    }
  }

  public async getTopScores(req: Request, res: Response): Promise<Response> {
    try {
      const count = parseInt(req.query.count as string) || 10;
      const scores = await this.scoreUseCase.getTopScores(count);
      return res.status(200).json(scores);
    } catch (error) {
      console.error("Error in getTopScores controller:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: `Internal server error: ${errorMessage}` });
    }
  }
}
