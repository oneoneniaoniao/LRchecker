import React from "react";
import Button from "@/components/ui/button/Button";

type GameOverProps = {
  score: number;
  onRestart: () => void;
};

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-8 py-8 min-h-screen">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Game Over</h1>
        <div className="space-y-4">
          <p className="text-2xl text-gray-700 dark:text-gray-300">
            Your Score
          </p>
          <div className="text-7xl font-bold text-blue-600 dark:text-blue-400">
            {score}
          </div>
        </div>
        <div className="pt-8">
          <Button buttonText="Once Again!?" onClick={onRestart} />
        </div>
      </div>
    </div>
  );
};

export default GameOver;
