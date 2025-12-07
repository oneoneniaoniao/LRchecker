import { Request, Response } from "express";
import { IWordUseCase } from "@/application/usecase/IWordUseCase";

export class WordController {
  private wordUseCase: IWordUseCase;

  constructor(wordUseCase: IWordUseCase) {
    this.wordUseCase = wordUseCase;
  }

  public async getRandom(req: Request, res: Response): Promise<Response> {
    try {
      const randomWord = await this.wordUseCase.getRandom();
      return res.status(200).json(randomWord);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  }
}
