import request from "supertest";
import { app } from "@/app";
import { pool } from "@/config/db";

jest.mock("@/config/db", () => ({
  pool: {
    query: jest.fn(),
    end: jest.fn(),
  },
}));

describe("Word API", () => {
  afterAll(() => {
    pool.end();
  });

  test("GET /word/random should return a word question with valid structure", async () => {
    const mockWordRow = {
      id: 1,
      word1_text: "hello",
      word1_url: "hello.mp3",
      word2_text: "world",
      word2_url: "world.mp3",
      created_at: new Date(),
      updated_at: new Date(),
    };

    (pool.query as jest.Mock).mockResolvedValue({ rows: [mockWordRow] });

    const response = await request(app).get("/word/random");
    expect(response.status).toBe(200);

    // 構造とプロパティの検証
    expect(response.body).toHaveProperty("audioUrl");
    expect(response.body).toHaveProperty("words");
    expect(response.body).toHaveProperty("correctIndex");

    const { words, audioUrl, correctIndex } = response.body;
    expect(Array.isArray(words)).toBe(true);
    expect(words.length).toBe(2);
    expect(typeof audioUrl).toBe("string");
    expect([0, 1]).toContain(correctIndex);

    // 音声URLに対応する単語が正解であることを検証
    expect(words[correctIndex]).toBe(
      audioUrl === "hello.mp3" ? "hello" : "world",
    );
  });

  test("GET /word/random should handle errors", async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/word/random");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Internal server error: Error: Database error",
    });
  });
});
