import React from "react";

type ButtonProps = {
  buttonText: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 min-w-[200px] text-lg"
    >
      {buttonText}
    </button>
  );
};

export default Button;
