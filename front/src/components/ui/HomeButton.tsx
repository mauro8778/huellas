import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';

interface HomeButtonProps {
  children?: React.ReactNode;
  className?: string;
}

const HomeButton: React.FC<HomeButtonProps> = () => {
  return (
    <button
     
      className="flex justify-center mt-6 text-2xl items-center text-lime500 hover:text-yellow500 transition-colors duration-300"
      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <MdArrowBackIosNew className="mr-1  " />
      Home
    </button>
  );
};

export default HomeButton;
