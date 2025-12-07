import React from "react";

type AudioButtonProps = {
  audioSrc: string;
  disabled?: boolean;
};

const ButtonAudio: React.FC<AudioButtonProps> = ({ audioSrc, disabled = false }) => {
  const handleClick = () => {
    if (disabled || !audioSrc) return;
    const audio = new Audio(audioSrc);
    audio.play().catch((error) => {
      console.error("音声の再生に失敗しました:", error);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`bg-purple-500 text-white font-bold px-10 py-5 rounded-full shadow-xl transform transition-all duration-200 text-xl flex items-center justify-center gap-2 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-purple-600 hover:shadow-2xl hover:scale-110 cursor-pointer"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Play Audio
    </button>
  );
};

export default ButtonAudio;
