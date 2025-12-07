import React, { useEffect, useState } from "react";
import ButtonAudio from "@/components/ui/button/ButtonAudio";
import Button from "@/components/ui/button/Button";
import { words } from "@/store/words";

const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

const Home: React.FC = () => {
  const [randomIndex, setRandomIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState("");
  const [currentAudio, setCurrentAudio] = useState("");
  const [result, setResult] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  const loadNewQuestion = () => {
    const index = getRandomIndex(words.length);
    setRandomIndex(index);

    const randomWordIndex = Math.floor(Math.random() * 2);
    const word = words[index][randomWordIndex];
    setSelectedWord(word);
    setResult("");
    setIsAnswered(false);
    console.log("selected word is " + word);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  useEffect(() => {
    if (selectedWord) {
      setCurrentAudio(`http://localhost:5001/audio/${selectedWord}.mp3`);
    }
  }, [selectedWord]);

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
        loadNewQuestion();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleWordClick = (word: string) => {
    if (isAnswered) return; // 既に回答済みの場合は何もしない

    setIsAnswered(true);
    if (word === selectedWord) {
      console.log("GOOD");
      setResult("correct!");
    } else {
      console.log("noooo");
      setResult("wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-8 py-8">
      <div className="flex justify-center">
        <ButtonAudio audioSrc={currentAudio} disabled={isAnswered} />
      </div>

      <div className="w-full space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            buttonText={words[randomIndex][0]}
            onClick={() => handleWordClick(words[randomIndex][0])}
            disabled={isAnswered}
          />
          <Button
            buttonText={words[randomIndex][1]}
            onClick={() => handleWordClick(words[randomIndex][1])}
            disabled={isAnswered}
          />
        </div>
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
