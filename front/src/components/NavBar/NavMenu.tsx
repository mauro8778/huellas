import Link from 'next/link';
import { useState } from 'react';

const NavMenu: React.FC = () => {
  // Estado para controlar la visibilidad del menú desplegable
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para alternar la visibilidad del menú desplegable
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <ul className="flex space-x-4 text-gray-100 text-xl  ">
        <li>
          <Link className=' hover:text-pink-300  ' href={{
            pathname: "/Home",
            query: {name: "test"},
          }}>
            Home
          </Link>
        </li>
        <li>
          <Link className=' hover:text-pink-300 ' href={{
            pathname: "/adopta",
            query: {name: "test"},
          }}>
            Adoptar
          </Link>
        </li>
       
        <li>
          <Link className=' hover:text-pink-300 hover:transform hover:scale-105 transition-transform duration-200' href={{
            pathname: "/refugios",
            query: {name: "test"},
          }}>
            Refugios
          </Link>
        </li>
        <li>
          <Link className='hover:text-gray-600' href={{
            pathname: "/dashboard",
            query: {name: "test"},
          }}>
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
