import React from "react";

type ButtonProps = {
  buttonText: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  buttonText,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {buttonText}
    </button>
  );
};

export default Button;
