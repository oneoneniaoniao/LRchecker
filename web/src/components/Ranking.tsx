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
      <div className="space-y-0 bg-white rounded-xl shadow-md p-6 max-[520px]:bg-transparent max-[520px]:shadow-none max-[520px]:p-2 max-[520px]:rounded-none">
        {scores.map((score, index) => {
          const getRankClass = () => {
            if (index === 0) return "medal-gold";
            if (index === 1) return "medal-silver";
            if (index === 2) return "medal-bronze";
            return "";
          };

          const isTopThree = index < 3;

          return (
            <div key={score.id}>
              <div className="flex items-center justify-between py-4 max-[520px]:py-3">
                <div className="flex items-center space-x-4">
                  <div className="w-12 flex justify-center max-[520px]:w-8">
                    {isTopThree ? (
                      <div className={getRankClass()}>{index + 1}</div>
                    ) : (
                      <div className="text-2xl font-bold text-gray-400">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-semibold text-gray-800 max-[520px]:text-base">
                    {score.playerName}
                  </div>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {score.score}
                </div>
              </div>
              {index < scores.length - 1 && (
                <div className="border-b border-gray-200 max-[520px]:border-gray-300"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ranking;
