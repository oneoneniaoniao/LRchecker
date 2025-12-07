import { Request, Response } from "express";
import { WordController } from "@/interface/controller/wordController";
import { IWordUseCase, IWordDTO } from "@/application/usecase/IWordUseCase";

describe("WordController", () => {
  let wordController: WordController;
  let mockWordUseCase: jest.Mocked<IWordUseCase>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockWordUseCase = {
      getRandom: jest.fn(),
    } as jest.Mocked<IWordUseCase>;

    wordController = new WordController(mockWordUseCase);

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("getRandom should return a random word", async () => {
    const mockWordDTO: IWordDTO = {
      words: ["hello", "world"],
      audioUrl: "hello.mp3",
      correctIndex: 0,
    };
    mockWordUseCase.getRandom.mockResolvedValue(mockWordDTO);

    await wordController.getRandom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockWordDTO);
  });

  test("getRandom should handle errors", async () => {
    const error = new Error("Something went wrong");
    mockWordUseCase.getRandom.mockRejectedValue(error);

    await wordController.getRandom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: `Internal server error: ${error}`,
    });
  });
});
