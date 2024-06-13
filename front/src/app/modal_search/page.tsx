import React from 'react';

import { RiMenuFold2Fill } from "react-icons/ri";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-20 pt-20">
      <div className=" backdrop-filter backdrop-blur bg-opacity-50 bg-white mt-16 p-4 rounded-lg shadow-sm relative w-11/12 md:w-2/3 lg:w-1/2 max-h-3/4">
        <button
          onClick={onClose}
          className="absolute top-2 right-8  text-black bg-transparent rounded-full p-1 "
        >
          <RiMenuFold2Fill className="w-9 h-9 text-gray-500 hover:text-gray-600  " />
        </button>
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar ">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
