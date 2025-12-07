import React from "react";

type AudioButtonProps = {
  audioSrc: string;
  disabled?: boolean;
};

const ButtonAudio: React.FC<AudioButtonProps> = ({
  audioSrc,
  disabled = false,
}) => {
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
      className={`bg-purple-500 text-white font-bold p-6 rounded-full shadow-xl transform transition-all duration-200 flex items-center justify-center ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-purple-600 hover:shadow-2xl hover:scale-110 cursor-pointer"
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
  );
};

export default ButtonAudio;
