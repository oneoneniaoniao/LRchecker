import React from "react";

type AudioButtonProps = {
  audioSrc: string;
};

const ButtonAudio: React.FC<AudioButtonProps> = ({ audioSrc }) => {
  const handleClick = () => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-200 text-xl flex items-center justify-center gap-2"
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
