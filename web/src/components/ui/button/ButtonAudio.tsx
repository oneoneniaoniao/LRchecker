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
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Play
    </button>
  );
};

export default ButtonAudio;
