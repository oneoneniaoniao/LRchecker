import React, { useEffect, useState } from "react";
import ButtonAudio from "@/components/ui/button/ButtonAudio";
import Button from "@/components/ui/button/Button";
import GameOver from "@/components/GameOver";
import GameInfo from "@/components/GameInfo";
import { fetchRandomWord, WordDTO } from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const Home: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<WordDTO | null>(null);
  const [currentAudio, setCurrentAudio] = useState("");
  const [result, setResult] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);

  const loadNewQuestion = async () => {
    const question = await fetchRandomWord();
    if (question) {
      setCurrentQuestion(question);
      setResult("");
      setIsAnswered(false);
    }
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setIsGameOver(false);
    setResult("");
    setIsAnswered(false);
    loadNewQuestion();
  };

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
      // 結果を表示してから1.5秒後に次の問題に移る
      const timer = setTimeout(() => {
        if (!isGameOver) {
          loadNewQuestion();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [result, isGameOver]);

  const handleWordClick = (wordIndex: number) => {
    if (isAnswered || isGameOver || !currentQuestion) return;

    setIsAnswered(true);
    if (wordIndex === currentQuestion.correctIndex) {
      setResult("correct!");
      setScore((prev) => prev + 1);
    } else {
      setResult("wrong");
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setIsGameOver(true);
      }
    }
  };

  if (isGameOver) {
    return <GameOver score={score} onRestart={restartGame} />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-20 py-8">
      <GameInfo score={score} lives={lives} />

      <div className="flex justify-center">
        <ButtonAudio audioSrc={currentAudio} disabled={isAnswered} />
      </div>

      <div className="w-full space-y-4">
        {currentQuestion && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          </div>
        )}
      </div>

      <div className="h-16 flex items-center justify-center">
        {result && (
          <div
            className={`text-4xl font-bold transition-all duration-300 animate-fade-in ${
              result === "correct!" ? "text-green-600" : "text-red-600"
            }`}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
