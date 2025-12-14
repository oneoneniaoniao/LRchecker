import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/ui/button/Button";
import Ranking, { RankingScore } from "@/components/Ranking";
import { saveScore, fetchTopScores } from "@/services/api";
import { useGameStore } from "@/store/gameStore";

const HIGH_SCORE_KEY = "lrchecker_high_score";

const GameOverPage: React.FC = () => {
  const router = useRouter();
  const { currentScore, isNewRecord, resetGameState } = useGameStore();
  const [playerName, setPlayerName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ranking, setRanking] = useState<RankingScore[]>([]);
  const [isLoadingRanking, setIsLoadingRanking] = useState(true);
  const [isInTop10, setIsInTop10] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // localStorageから直接ハイスコアを読み込む
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      const score = saved ? parseInt(saved, 10) : 0;
      setBestScore(score);
    }
  }, []);

  // スコアが無効な場合はホームにリダイレクト
  useEffect(() => {
    if (currentScore === null || currentScore < 0) {
      router.push("/");
    }
  }, [currentScore, router]);

  // ランキングを読み込む
  useEffect(() => {
    const loadRanking = async () => {
      if (currentScore === null) return;
      setIsLoadingRanking(true);
      const scores = await fetchTopScores(10);
      setRanking(scores);
      // 10位以内に入っているかチェック（ランキングが10未満の場合は自動的に入る）
      if (scores.length < 10) {
        setIsInTop10(true);
      } else {
        // 10位のスコアと比較
        const tenthPlaceScore = scores[9].score;
        setIsInTop10(currentScore > tenthPlaceScore);
      }
      setIsLoadingRanking(false);
    };
    if (currentScore !== null) {
      loadRanking();
    }
  }, [currentScore]);

  // スコアが保存された後にランキングを再読み込み
  useEffect(() => {
    if (isSubmitted && currentScore !== null) {
      const loadRanking = async () => {
        const scores = await fetchTopScores(10);
        setRanking(scores);
        // 10位以内に入っているか再チェック
        if (scores.length < 10) {
          setIsInTop10(true);
        } else {
          const tenthPlaceScore = scores[9].score;
          setIsInTop10(currentScore > tenthPlaceScore);
        }
      };
      loadRanking();
    }
  }, [isSubmitted, currentScore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || currentScore === null) return;

    setIsSubmitting(true);
    const saved = await saveScore(playerName.trim(), currentScore);
    setIsSubmitting(false);

    if (saved) {
      setIsSubmitted(true);
    }
  };

  const handleRestart = () => {
    resetGameState();
    router.push("/");
  };

  // スコアが読み込まれるまで表示しない
  if (currentScore === null) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto space-y-8 py-8 min-h-screen px-4 max-[520px]:px-2">
      <div className="text-center space-y-6 animate-fade-in w-full">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Game Over</h1>
        <div className="space-y-4">
          <p className="text-2xl text-gray-700 dark:text-gray-400">
            Your Score
          </p>
          <div className="text-7xl font-bold text-blue-600 dark:text-blue-400">
            {currentScore}
          </div>
          {isNewRecord && (
            <div className="animate-bounce mt-2">
              <p className="text-3xl font-bold text-yellow-500 drop-shadow-lg">
                New Record!
              </p>
            </div>
          )}
          {!isNewRecord && bestScore !== null && bestScore > 0 && (
            <div className="pt-2">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Best Score:{" "}
                <span className="font-bold text-gray-800 dark:text-gray-400">
                  {bestScore}
                </span>
              </p>
            </div>
          )}
        </div>

        {!isSubmitted && currentScore > 0 && isInTop10 && !isLoadingRanking && (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="flex flex-col items-center space-y-8">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name (max 16 characters)"
                maxLength={16}
                className="px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full max-w-md"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={!playerName.trim() || isSubmitting}
                className={`bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transform transition-all duration-200 min-w-[200px] text-2xl ${
                  !playerName.trim() || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Save Score"}
              </button>
            </div>
          </form>
        )}

        {isSubmitted && (
          <div className="pt-4">
            <p className="text-green-600 text-xl font-semibold mb-4">
              Score saved!
            </p>
            <Button buttonText="Try Again" onClick={handleRestart} />
          </div>
        )}

        {!isSubmitted &&
          currentScore > 0 &&
          (!isInTop10 || isLoadingRanking) && (
            <div>
              <Button buttonText="Try Again" onClick={handleRestart} />
            </div>
          )}
        {!isSubmitted && currentScore > 0 && isInTop10 && !isLoadingRanking && (
          <div>
            <Button buttonText="Skip" onClick={handleRestart} />
          </div>
        )}
        {!isSubmitted && currentScore === 0 && (
          <div className="pt-4">
            <Button buttonText="Try Again" onClick={handleRestart} />
          </div>
        )}
      </div>

      {!isLoadingRanking && (
        <div className="w-full flex justify-center max-[520px]:px-0">
          <Ranking scores={ranking} />
        </div>
      )}
    </div>
  );
};

export default GameOverPage;
