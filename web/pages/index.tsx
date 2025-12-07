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

  useEffect(() => {
    const index = getRandomIndex(words.length);
    setRandomIndex(index);

    const randomWordIndex = Math.floor(Math.random() * 2);
    const word = words[index][randomWordIndex];
    setSelectedWord(word);
    console.log("selected word is " + word);
  }, []);

  useEffect(() => {
    if (selectedWord) {
      setCurrentAudio(`http://localhost:5001/audio/${selectedWord}.mp3`);
    }
  }, [selectedWord]);

  const handleWordClick = (word: string) => {
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
        <ButtonAudio audioSrc={currentAudio} />
      </div>

      <div className="w-full space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            buttonText={words[randomIndex][0]}
            onClick={() => handleWordClick(words[randomIndex][0])}
          />
          <Button
            buttonText={words[randomIndex][1]}
            onClick={() => handleWordClick(words[randomIndex][1])}
          />
        </div>
      </div>

      <div className="h-16 flex items-center justify-center">
        {result && (
          <div
            className={`text-4xl font-bold transition-all duration-300 ${
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
