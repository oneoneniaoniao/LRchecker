import React from "react";

type ButtonProps = {
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ buttonText, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transform transition-all duration-200 min-w-[200px] text-lg ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      }`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
