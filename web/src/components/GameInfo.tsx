import React from "react";
import { INITIAL_LIVES } from "@/config/gameConfig";

type GameInfoProps = {
  score: number;
  lives: number;
  highScore: number;
};

const GameInfo: React.FC<GameInfoProps> = ({ score, lives, highScore }) => {
  // ライフ数の配列を生成（1からINITIAL_LIVESまで）
  const lifeArray = Array.from({ length: INITIAL_LIVES }, (_, i) => i + 1);

  return (
    <div className="fixed top-4 left-4 right-4 flex justify-between items-start z-10">
      {/* スコア表示 - 左 */}
      <div className="flex flex-col gap-1">
        {highScore > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-md font-semibold text-gray-700 dark:text-gray-400">
              My High Score:
            </span>
            <span className="text-lg font-bold text-purple-600 dark:text-gray-400">
              {highScore}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-400">
            Score:
          </span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {score}
          </span>
        </div>
      </div>

      {/* ライフ表示 - 右 */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {lifeArray.map((life) => (
            <span
              key={life}
              className={`text-2xl ${
                life <= lives ? "text-red-500" : "text-gray-400"
              }`}
            >
              ♥
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
