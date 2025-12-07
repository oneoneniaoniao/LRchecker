import React from "react";

type GameInfoProps = {
  score: number;
  lives: number;
};

const GameInfo: React.FC<GameInfoProps> = ({ score, lives }) => {
  return (
    <div className="fixed top-4 left-4 right-4 flex justify-between items-center z-10">
      {/* スコア表示 - 左 */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-400">
          Score:
        </span>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {score}
        </span>
      </div>

      {/* ライフ表示 - 右 */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3].map((life) => (
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
