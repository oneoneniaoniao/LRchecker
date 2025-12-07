const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export interface WordDTO {
  id: number;
  words: string[];
  audioUrl: string;
  correctIndex: number;
}

export const fetchRandomWord = async (): Promise<WordDTO | null> => {
  try {
    const response = await fetch(`${API_URL}/word/random`);
    if (!response.ok) {
      throw new Error("Failed to fetch random word");
    }
    const data: WordDTO = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching random word:", error);
    return null;
  }
};
