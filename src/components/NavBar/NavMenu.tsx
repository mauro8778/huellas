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
        {/* <li className="relative z-10" onClick={toggleMenu}>
          <span className="text-white cursor-pointer hover:text-gray-600">Mascotas</span>
          {menuOpen && (
            <ul className="absolute bg-white shadow-lg py-2 mt-2 rounded-md w-32">
              <li>
                <Link href="/mascotas/perros">
                  <p className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Perros</p>
                </Link>
              </li>
              <li>
                <Link href="/mascotas/gatos">
                  <p className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Gatos</p>
                </Link>
              </li>
              <li>
                <Link href="/adopta">
                  <p className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Adopta</p>
                </Link>
              </li>
            </ul>
          )}
        </li> */}
        {/* <li>
          <Link className='hover:text-gray-600' href={{
            pathname: "/Contact",
            query: {name: "test"},
          }}>
            Contacto
          </Link>
        </li> */}
        {/* <li>
          <Link className='hover:text-gray-600' href="/about">
            About
          </Link>
        </li> */}
        <li>
          <Link className=' hover:text-pink-300 hover:transform hover:scale-105 transition-transform duration-200' href={{
            pathname: "/refugios",
            query: {name: "test"},
          }}>
            Refugios
          </Link>
        </li>
        {/* <li>
          <Link className='hover:text-gray-600' href={{
            pathname: "/donations",
            query: {name: "test"},
          }}>
            Donaciones
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavMenu;
