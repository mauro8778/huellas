

interface DesplegableUserProps {

  isOpen: boolean;
  toggleMenu: () => void;
}

export const DesplegableUser: React.FC<DesplegableUserProps> = ({ isOpen, toggleMenu }) => {
  

 
  return (
    <div className="relative">
      
      <div
        id="dropdownDelay"
        className={`absolute right-0 z-10 mt-10 w-44 bg-rose-50 divide-y  divide-gray-100 rounded-lg ${isOpen ? 'block' : 'hidden'}`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
          <li>
            <a href="/dashboard" className="flex h-[48px] w-full mt-2 items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-pink-200 hover:text-pink-600 md:flex-none md:justify-start md:p-2 md:px-3">Dashboard</a>
          </li>
          <li>
            <a href="/setting" className="flex h-[48px] w-full mt-2 items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-pink-200 hover:text-pink-600 md:flex-none md:justify-start md:p-2 md:px-3">Setting</a>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default DesplegableUser;
