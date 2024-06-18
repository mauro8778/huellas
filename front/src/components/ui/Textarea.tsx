import React, { ChangeEvent } from 'react';

interface TextAreaProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ 
  name, 
  placeholder, 
  value, 
  onChange, 
  className = '', 
  rows = 4, 
  required = false
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-xl ${className} border-2 border-lime-500 shadow-xl`}
      rows={rows}
      required={required}
    />
  );
};

export default TextArea;
