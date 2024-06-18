import { FC } from 'react';

interface ButtonProps {
  type: 'button' | 'submit';
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean; 
  isValid?: boolean | null;
  children?: React.ReactNode;
    
}

const Button: FC<ButtonProps> = ({ type, label, className }) => {
  return (
    <button
      type={type}
      className={`w-full bg-lime500 text-white py-3 px-4 rounded-xl border-2 border-lime500 hover:bg-transparent hover:border-lime500 hover:text-gray-900 transition-colors duration-300 ${className} shadow-xl `}
    >
      {label}
    </button>
  );
};

export default Button;
