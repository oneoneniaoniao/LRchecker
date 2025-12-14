import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ButtonAudio from "@/components/ui/button/ButtonAudio";
import Button from "@/components/ui/button/Button";
import LoadingButton from "@/components/ui/button/LoadingButton";
import GameInfo from "@/components/GameInfo";
import { fetchRandomWord, WordDTO } from "@/services/api";
import { INITIAL_LIVES } from "@/config/gameConfig";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const HIGH_SCORE_KEY = "lrchecker_high_score";

const Home: React.FC = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<WordDTO | null>(null);
  const [currentAudio, setCurrentAudio] = useState("");
  const [result, setResult] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [highScore, setHighScore] = useState(0);
  const [audioResetTrigger, setAudioResetTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadNewQuestion = async () => {
    setIsLoading(true);
    const question = await fetchRandomWord();
    if (question) {
      setCurrentQuestion(question);
      setResult("");
      setIsAnswered(false);
      setAudioResetTrigger((prev) => prev + 1); // 再生回数をリセット
      // ボタンのフォーカスを外す
      if (typeof window !== "undefined") {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement) {
          activeElement.blur();
        }
      }
    }
    setIsLoading(false);
  };

  // ハイスコアをlocalStorageから読み込む
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
      if (savedHighScore) {
        setHighScore(parseInt(savedHighScore, 10));
      }
    }
  }, []);

  useEffect(() => {
    loadNewQuestion();
  }, []);

  useEffect(() => {
    if (currentQuestion) {
      setCurrentAudio(`${API_URL}/${currentQuestion.audioUrl}`);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (currentAudio && !isAnswered) {
      // 新しい問題が読み込まれたら自動で音声を再生
      const timer = setTimeout(() => {
        const audio = new Audio(currentAudio);
        audio.play().catch((error) => {
          console.error("音声の自動再生に失敗しました:", error);
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentAudio, isAnswered]);

  useEffect(() => {
    if (result) {
      // 正解/不正解の音声を再生
      const soundPath =
        result === "correct!" ? "/sounds/correct.mp3" : "/sounds/wrong.mp3";
      const audio = new Audio(soundPath);
      audio.play().catch((error) => {
        console.error("結果音声の再生に失敗しました:", error);
      });

      // 結果を表示してから.5秒後に次の問題に移る
      const timer = setTimeout(() => {
        loadNewQuestion();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [result]);

  // ハイスコアを更新
  useEffect(() => {
    if (typeof window !== "undefined" && score > highScore) {
      const newHighScore = score;
      setHighScore(newHighScore);
      localStorage.setItem(HIGH_SCORE_KEY, newHighScore.toString());
    }
  }, [score, highScore]);

  const handleWordClick = (wordIndex: number) => {
    if (isAnswered || !currentQuestion) return;

    setIsAnswered(true);
    // ボタンのフォーカスを外す
    if (typeof window !== "undefined") {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        activeElement.blur();
      }
    }
    if (wordIndex === currentQuestion.correctIndex) {
      setResult("correct!");
      setScore((prev) => prev + 1);
    } else {
      setResult("wrong");
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        // ゲームオーバー時にハイスコアを更新してから遷移
        if (typeof window !== "undefined" && score > highScore) {
          const newHighScore = score;
          localStorage.setItem(HIGH_SCORE_KEY, newHighScore.toString());
        }
        // ゲームオーバーページに遷移
        router.push(`/gameover?score=${score}`);
      }
    }
  };

  return (
    <>
      <GameInfo score={score} lives={lives} highScore={highScore} />
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-12 py-4">
        <div className="flex justify-center -mt-8">
          <ButtonAudio
            audioSrc={currentAudio}
            disabled={isAnswered}
            maxPlays={2}
            resetTrigger={audioResetTrigger}
          />
        </div>

        <div className="w-full space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center min-h-[80px]">
            {isLoading ? (
              <>
                <LoadingButton />
                <LoadingButton />
              </>
            ) : currentQuestion ? (
              <>
                <Button
                  buttonText={currentQuestion.words[0]}
                  onClick={() => handleWordClick(0)}
                  disabled={isAnswered}
                />
                <Button
                  buttonText={currentQuestion.words[1]}
                  onClick={() => handleWordClick(1)}
                  disabled={isAnswered}
                />
              </>
            ) : null}
          </div>
        </div>

        {result && (
          <div
            className={`fixed bottom-10 transform z-50 text-4xl font-bold transition-all duration-300 animate-fade-in pointer-events-none ${
              result === "correct!" ? "text-green-600" : "text-red-600"
            }`}
          >
            {result}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
