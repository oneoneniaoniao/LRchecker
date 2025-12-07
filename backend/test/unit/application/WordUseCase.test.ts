import { WordUseCase } from "@/application/usecase/WordUseCase";
import { Word } from "@/domain/model/Word";
import { IWordRepository } from "@/domain/repository/IWordRepository";

describe("WordUseCase", () => {
  let wordUseCase: WordUseCase;
  let mockRepository: jest.Mocked<IWordRepository>;

  beforeEach(() => {
    mockRepository = { findRandom: jest.fn() };
    wordUseCase = new WordUseCase(mockRepository);
  });

  // ランダム性を固定した場合のテスト
  describe("with fixed randomness", () => {
    let randomSpy: jest.SpyInstance;

    beforeEach(() => {
      randomSpy = jest.spyOn(Math, "random");
    });

    afterEach(() => {
      randomSpy.mockRestore();
    });

    test("should return first word when Math.random returns 0.3", async () => {
      const mockWord = new Word("hello", "hello.mp3", "world", "world.mp3");
      mockRepository.findRandom.mockResolvedValue(mockWord);
      randomSpy.mockReturnValue(0.3);

      const result = await wordUseCase.getRandom();

      expect(result).toEqual({
        audioUrl: "hello.mp3",
        words: expect.arrayContaining(["hello", "world"]),
        correctIndex: expect.any(Number),
      });
    });
  });

  // 一般的な動作のテスト
  describe("with natural randomness", () => {
    test("returns valid structure and content", async () => {
      const mockWord = new Word("hello", "hello.mp3", "world", "world.mp3");
      mockRepository.findRandom.mockResolvedValue(mockWord);

      const result = await wordUseCase.getRandom();

      expect(result).not.toBeNull();
      if (result) {
        expect(result.words).toHaveLength(2);
        expect(result.words).toContain("hello");
        expect(result.words).toContain("world");
        expect(result.audioUrl).toMatch(/.*\.mp3$/);
        expect([0, 1]).toContain(result.correctIndex);

        // 正解の単語とaudioUrlの関連性を検証
        const isValidPair =
          (result.audioUrl === "hello.mp3" &&
            result.words[result.correctIndex] === "hello") ||
          (result.audioUrl === "world.mp3" &&
            result.words[result.correctIndex] === "world");

        expect(isValidPair).toBe(true);
      }
    });
  });

  // エッジケース
  test("returns null when repository returns null", async () => {
    mockRepository.findRandom.mockResolvedValue(null);
    const result = await wordUseCase.getRandom();
    expect(result).toBeNull();
  });
});
