import React, { ChangeEvent } from 'react';

interface TextAreaProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number; // revisar esto.
}

export const TextArea: React.FC<TextAreaProps> = ({ name, placeholder, value, onChange, className = '', rows = 4 }) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={` rounded-xl ${className} border-2 border-lime500 shadow-xl ` }
      rows={rows} 
    />
  );
};

export default TextArea;
