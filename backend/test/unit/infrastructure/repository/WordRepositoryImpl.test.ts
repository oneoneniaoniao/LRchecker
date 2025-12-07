import { wordRepository } from "@/infrastructure/repository/WordRepository";
import { pool } from "@/config/db";

jest.mock("@/config/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("WordRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("findRandom() should return a word pair", async () => {
    const mockWordRow = {
      id: 1,
      word1_text: "hello",
      word1_url: "hello.mp3",
      word2_text: "world",
      word2_url: "world.mp3",
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockWord = {
      word1Text: "hello",
      word1Url: "hello.mp3",
      word2Text: "world",
      word2Url: "world.mp3",
    };
    (pool.query as jest.Mock).mockResolvedValue({ rows: [mockWordRow] });

    const result = await wordRepository.findRandom();

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM words ORDER BY RANDOM() LIMIT 1",
    );
    expect(result).toEqual(mockWord);
  });

  test("findRandom() should return null if no word is found", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

    const result = await wordRepository.findRandom();

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM words ORDER BY RANDOM() LIMIT 1",
    );
    expect(result).toBeNull();
  });
});
