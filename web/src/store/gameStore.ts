import { create } from "zustand";

interface GameState {
  highScore: number;
  currentScore: number | null;
  isNewRecord: boolean;
  isInitialized: boolean;
  setHighScore: (score: number) => void;
  setCurrentScore: (score: number | null) => void;
  setIsNewRecord: (isNew: boolean) => void;
  resetGameState: () => void;
  initializeHighScore: () => void;
}

const HIGH_SCORE_KEY = "lrchecker_high_score";

// localStorageからハイスコアを読み込む（クライアントサイドのみ）
const loadHighScore = (): number => {
  if (typeof window === "undefined") return 0;
  const saved = localStorage.getItem(HIGH_SCORE_KEY);
  return saved ? parseInt(saved, 10) : 0;
};

export const useGameStore = create<GameState>((set) => ({
  highScore: 0, // サーバーサイドとクライアントサイドで同じ初期値
  currentScore: null,
  isNewRecord: false,
  isInitialized: false,
  setHighScore: (score: number) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    }
    set({ highScore: score });
  },
  setCurrentScore: (score: number | null) => {
    set({ currentScore: score });
  },
  setIsNewRecord: (isNew: boolean) => {
    set({ isNewRecord: isNew });
  },
  resetGameState: () => {
    set({
      currentScore: null,
      isNewRecord: false,
    });
  },
  initializeHighScore: () => {
    if (
      typeof window !== "undefined" &&
      !useGameStore.getState().isInitialized
    ) {
      const savedHighScore = loadHighScore();
      set({ highScore: savedHighScore, isInitialized: true });
    }
  },
}));
