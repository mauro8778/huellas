interface DesplegableUserProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const DesplegableUser: React.FC<DesplegableUserProps> = ({ isOpen, toggleMenu }) => {

  const handleLogout = () => {
    
    localStorage.removeItem('userSession');

    
    window.location.href = '/AUTH/login'; 
  };

  return (
    <div className="relative">
      <div
        id="dropdownDelay"
        className={`absolute right-0 z-10 mt-2 w-48 bg- rounded-lg shadow-xl border-t-4 border-lime500 bg-white ${isOpen ? 'block' : 'hidden'}`}
      >
        <ul className="py-2">
          <li>
            <a
              href="/dashboard"
              className="flex h-12 w-full font-semibold  items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 rounded-t-lg"
            >
              Dashboard
            </a>
          </li>
          <li>
            <p
              onClick={handleLogout}
              className="flex h-12 w-full items-center   font-semibold px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 rounded-b-lg"
            >
              Logout
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesplegableUser;
