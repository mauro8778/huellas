import Image from 'next/image'; 
import GoogleIcon from '../../../public/GoogleIcon.webp'; 

interface ButtonGoogleProps {
  onClick: () => void;
  label: string;
  type: 'button';
  className: string
}

const ButtonGoogle: React.FC<ButtonGoogleProps> = ({ onClick, label }) => {
  return (
    <button
      type="button"
      className="w-full rounded-xl bg-gray-50 text-gray-600 py-3 hover:bg-gray-100 hover:text-gray-700 px-4 flex items-center justify-center shadow-xl"
      onClick={onClick}
    >
      <Image src={GoogleIcon} alt="Google Icon" className="mr-2" width={20} height={20} /> 
      {label}
    </button>
  );
};

export default ButtonGoogle;
