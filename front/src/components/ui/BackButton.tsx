import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';

interface BackButtonProps {
  
}

const BackButton: React.FC<BackButtonProps> = () => {
  return (
    <button
     
      className="flex justify-center mt-12 text-2xl items-center text-lime500 hover:text-yellow500 transition-colors duration-300"
      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <MdArrowBackIosNew className="mr-1  " />
      Back
    </button>
  );
};

export default BackButton;
