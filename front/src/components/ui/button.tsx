import { FC } from 'react';

interface ButtonProps {
  type: 'button' | 'submit';
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean; 
  isValid?: boolean | null;
    
}

const Button: FC<ButtonProps> = ({ type, label, className }) => {
  return (
    <button
      type={type}
      className={`w-full bg-pink-600 text-white py-3 px-4 rounded-xl border-2 border-transparent hover:bg-transparent hover:border-pink-600 hover:text-pink-600 transition-colors duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
