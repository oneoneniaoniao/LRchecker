const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export interface WordDTO {
  id: number;
  words: string[];
  audioUrl: string;
  correctIndex: number;
}

export interface ScoreDTO {
  id: number;
  playerName: string;
  score: number;
  createdAt: string;
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

export const saveScore = async (
  playerName: string,
  score: number
): Promise<ScoreDTO | null> => {
  try {
    const response = await fetch(`${API_URL}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerName, score }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Failed to save score:", response.status, errorData);
      throw new Error(`Failed to save score: ${response.status} ${JSON.stringify(errorData)}`);
    }
    const data: ScoreDTO = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving score:", error);
    return null;
  }
};

export const fetchTopScores = async (count: number = 10): Promise<ScoreDTO[]> => {
  try {
    const response = await fetch(`${API_URL}/score/top?count=${count}`);
    if (!response.ok) {
      throw new Error("Failed to fetch top scores");
    }
    const data: ScoreDTO[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top scores:", error);
    return [];
  }
};
