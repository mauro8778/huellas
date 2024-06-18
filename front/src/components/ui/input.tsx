import { FC, useState, useEffect } from 'react';
import { cn } from '@/libs/utils';
import { RiLockLine, RiLockUnlockLine, RiCheckFill, RiErrorWarningFill } from 'react-icons/ri';

interface InputProps {
  type: 'text' | 'password' | 'date' | 'number' | 'email';
  placeholder: string;
  className?: string;
  name?: string;
  value?: string |  number ;
  isValid?: boolean | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; 
}

const validateInput = (type: string, value: string): boolean => {
  if (type === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }
  // lueo agrego mas validaciones 
  return value.trim() !== '';
};

const Input: FC<InputProps> = ({
  type,
  placeholder,
  className,
  name,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFieldValid, setIsFieldValid] = useState<boolean | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isTouched) {
      setIsFieldValid(validateInput(type, String(value || '')));

    }
  }, [isTouched, type, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setIsTouched(true);
    const valid = validateInput(type, newValue);
    setIsFieldValid(valid);
    if (onChange) onChange(e);
  };

  return (
    <div className="w-full relative mb-5  ">
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        className={cn(
          'bg-gray-50 w-full py-3 pl-4 pr-12 outline-none rounded-xl border-2 border-lime500 shadow-xl',
          className,
          
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
      
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <RiLockUnlockLine /> : <RiLockLine />}
        </button>
      )}
    </div>
  );
};

export default Input;
