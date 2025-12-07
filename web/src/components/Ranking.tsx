import React from "react";

export interface RankingScore {
  id: number;
  playerName: string;
  score: number;
  createdAt: string;
}

type RankingProps = {
  scores: RankingScore[];
};

const Ranking: React.FC<RankingProps> = ({ scores }) => {
  if (scores.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No rankings yet</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🏆 Top 10
      </h2>
      <div className="space-y-2">
        {scores.map((score, index) => (
          <div
            key={score.id}
            className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`text-2xl font-bold ${
                  index === 0
                    ? "text-yellow-500"
                    : index === 1
                      ? "text-gray-400"
                      : index === 2
                        ? "text-amber-600"
                        : "text-gray-400"
                }`}
              >
                #{index + 1}
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {score.playerName}
              </div>
            </div>
            <div className="text-xl font-bold text-blue-600">{score.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
