import React from "react";

const LoadingButton: React.FC = () => {
  return (
    <button
      disabled
      className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg min-w-[200px] text-2xl cursor-not-allowed animate-shimmer relative overflow-hidden"
    >
      <span className="relative z-10 opacity-0">Loading</span>
    </button>
  );
};

export default LoadingButton;
