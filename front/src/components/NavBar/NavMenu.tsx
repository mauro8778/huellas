


import { decodeJwt } from '@/utils/decodeJwt';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';

const NavMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const userSessionStr = localStorage.getItem('userSession');
    
    if (userSessionStr) {
      const userSession = JSON.parse(userSessionStr);
      
      if (userSession && userSession.access_token) {
        const token = userSession.access_token;

        try {
          const decodedToken = decodeJwt(token);
          console.log(decodedToken); 

          const roles = decodedToken['https://huellasdesperanza.com/roles'];
          if (roles && roles.length > 0) {
            setUserRole(roles[0]); 
          }
        } catch (error) {
          console.error('Error decoding token', error);
        }
      }
    }
  }, []);

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

        {userRole !== 'Shelter' && (

          <Link
            className="hover:text--300"
            href={{
              pathname: "/Home",
              query: { name: "test" },
            }}
          >
            Home
          </Link>
)}
        </li>
        {userRole !== 'Shelter' && (
          <li>
            <Link
              className="hover:text-gray-300"
              href={{
                pathname: "/adopta",
                query: { name: "test" },
              }}
            >
              Adoptar
            </Link>
          </li>
        )}
        <li>

        {userRole !== 'Shelter' && (

          <Link
            className="hover:text-gray-300 hover:transform hover:scale-105 transition-transform duration-200"
            href={{
              pathname: "/refugios",
              query: { name: "test" },
            }}
          >
            Refugios
          </Link>
)}
        </li>
        <li>
          <Link className='hover:text-gray-300' href={{
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
