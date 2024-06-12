import { FC } from 'react';
import { IconType } from 'react-icons';
import { FcGoogle } from 'react-icons/fc';

interface ButtonIconProps {
  icon: IconType;
}

const ButtonIcon: FC<ButtonIconProps> = ({ icon: Icon }) => {
  return (
    <button
    type="button"
    className="w-full flex items-center justify-center text-pink-600 border border-pink-600 hover:bg-pink-50 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
  >
   
    <FcGoogle className="w-4 h-4 mr-2" />
    Iniciar sesión con Google
  </button>
  );
};

export default ButtonIcon;
