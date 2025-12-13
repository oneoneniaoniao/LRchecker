import React, { useState } from "react";

type AudioButtonProps = {
  audioSrc: string;
  disabled?: boolean;
  maxPlays?: number;
  onPlayCountChange?: (count: number) => void;
  resetTrigger?: number; // 新しい問題が来たときにリセットするためのトリガー
};

const ButtonAudio: React.FC<AudioButtonProps> = ({
  audioSrc,
  disabled = false,
  maxPlays = 2,
  onPlayCountChange,
  resetTrigger = 0,
}) => {
  const [playCount, setPlayCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // resetTriggerが変わったら再生回数をリセット
  React.useEffect(() => {
    setPlayCount(0);
    setIsPlaying(false);
  }, [resetTrigger]);

  const handleClick = () => {
    if (disabled || !audioSrc || isPlaying || playCount >= maxPlays) return;

    setIsPlaying(true);
    const audio = new Audio(audioSrc);
    audio.play().catch((error) => {
      console.error("音声の再生に失敗しました:", error);
      setIsPlaying(false);
    });

    // 音声再生が終わったら再生中フラグを解除（最大1秒待機）
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    // 1秒後に強制的に再生中フラグを解除（フォールバック）
    setTimeout(() => {
      setIsPlaying(false);
    }, 1000);

    const newPlayCount = playCount + 1;
    setPlayCount(newPlayCount);
    if (onPlayCountChange) {
      onPlayCountChange(newPlayCount);
    }
  };

  const remainingPlays = maxPlays - playCount;
  const isDisabled = disabled || isPlaying || playCount >= maxPlays;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`bg-purple-500 text-white font-bold p-6 rounded-full shadow-xl transform transition-all duration-200 flex items-center justify-center ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-purple-600 hover:shadow-2xl hover:scale-110 cursor-pointer active:scale-95"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M9.5 6.5C9.5 6.2 9.7 6 10 6L18.5 12L10 18C9.7 18 9.5 17.8 9.5 17.5V6.5Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
        {Array.from({ length: maxPlays }).map((_, index) => (
          <span
            key={index}
            className={`text-xl ${
              index < remainingPlays ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default ButtonAudio;
