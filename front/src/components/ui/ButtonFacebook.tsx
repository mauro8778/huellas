import { FaFacebook } from 'react-icons/fa';

interface ButtonFacebookProps {
    onClick: () => void;
    label: string;
    type:'button'
    className: string
  }

  const ButtonFacebook: React.FC<ButtonFacebookProps> = ({ onClick, label }) => {
  return (
    <button
      type="button"
      className="bg-blue-600 text-white hover:bg-blue-700 mt-2 px-4 rounded-xl  flex items-center justify-center w-full py-3 shadow-xl"
      onClick={onClick}
    >
      <FaFacebook className="mr-2" />
      {label}
    </button>
  );
};

export default ButtonFacebook;
