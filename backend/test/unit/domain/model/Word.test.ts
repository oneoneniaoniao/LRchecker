import { Word } from "@/domain/model/Word";

describe("Word", () => {
  test("should create a Word instance with correct properties", () => {
    const word = new Word("hello", "hello.mp3", "world", "world.mp3");

    expect(word.word1Text).toBe("hello");
    expect(word.word1Url).toBe("hello.mp3");
    expect(word.word2Text).toBe("world");
    expect(word.word2Url).toBe("world.mp3");
  });
});
