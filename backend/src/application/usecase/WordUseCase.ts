import { IWordUseCase, IWordDTO } from "@/application/usecase/IWordUseCase";
import { IWordRepository } from "@/domain/repository/IWordRepository";

export class WordUseCase implements IWordUseCase {
  constructor(private wordRepository: IWordRepository) {}

  async getRandom(): Promise<IWordDTO | null> {
    const result = await this.wordRepository.findRandom();
    if (!result) return null;
    const { id, word1Text, word1Url, word2Text, word2Url } = result;

    const audioIsFirst = Math.random() < 0.5;
    const audioUrl = audioIsFirst ? word1Url : word2Url;
    const correctWord = audioIsFirst ? word1Text : word2Text;

    const wordsArray = [word1Text, word2Text];
    if (Math.random() < 0.5) {
      [wordsArray[0], wordsArray[1]] = [wordsArray[1], wordsArray[0]];
    }

    for (let i = wordsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]];
    }

    const correctIndex = wordsArray.indexOf(correctWord);
    return {
      id,
      words: wordsArray,
      audioUrl,
      correctIndex: correctIndex,
    };
  }
}
