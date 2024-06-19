import Link from 'next/link';
import { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md'; 

const NavMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative">
      <div className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-gray-100"></div>
        <button
          className="text-gray-100 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
      <ul className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 text-gray-100 text-xl p-4 md:p-0 ${menuOpen ? 'block' : 'hidden md:flex'}`}>
        <li>
          <Link
            className="hover:text-pink-300"
            href={{
              pathname: "/Home",
              query: { name: "test" },
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-pink-300"
            href={{
              pathname: "/adopta",
              query: { name: "test" },
            }}
          >
            Adoptar
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-pink-300 hover:transform hover:scale-105 transition-transform duration-200"
            href={{
              pathname: "/refugios",
              query: { name: "test" },
            }}
          >
            Refugios
          </Link>
        </li>
        <li>
          <Link className='hover:text-gray-600' href={{
            pathname: "/comunidad",
            query: {name: "test"},
          }}>
            Comunidad
          </Link>
        </li> 
      </ul>
    </nav>
  );
};

export default NavMenu;
