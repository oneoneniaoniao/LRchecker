import { Word } from "../model/Word";

export interface IWordRepository {
  findRandom(): Promise<Word | null>;
}
