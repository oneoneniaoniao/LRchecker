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
      setResult("⭕️ 正解！");
    } else {
      console.log("noooo");
      setResult("❌ 間違い");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ButtonAudio audioSrc={currentAudio} />
      <div className="flex mt-4">
        <Button
          buttonText={words[randomIndex][0]}
          onClick={() => handleWordClick(words[randomIndex][0])}
        />
        <Button
          buttonText={words[randomIndex][1]}
          onClick={() => handleWordClick(words[randomIndex][1])}
        />
      </div>
      <div className="mt-4 text-2xl">{result}</div>
    </div>
  );
};

export default Home;
