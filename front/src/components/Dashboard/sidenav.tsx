import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavLinks from './nav_links';
import { FaPowerOff } from 'react-icons/fa';
import ImageLogo from '@/components/ui/imageLogo';
import Image from 'next/image';
import { decodeJwt } from '@/utils/decodeJwt';
import { JwtPayload } from '@/types/index';
import useUserRole from '@/utils/userSession';

const SideNav: React.FC<{ role: 'admin' | 'user' | 'shelter' }> = ({ role }) => {
  const [userData, setUserData] = useState<Partial<JwtPayload> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userRole = useUserRole(); 

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const { id_token } = JSON.parse(session);
      if (id_token) {
        const decodedToken = decodeJwt(id_token);
        if (decodedToken) {
          setUserData({
            name: decodedToken.name,
            nickname: decodedToken.nickname,
            picture: decodedToken.picture,
            email: decodedToken.email,
            role: decodedToken['https://huellasdesperanza.com/roles']?.[0],
          });
          setIsLoggedIn(true);
        }
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userSession');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = '/Home';
  };

  return (
    <div className="flex flex-col h-full px-3 w-64 py-4 md:px-2 z-0 ">
      {userRole !== 'Shelter' && (
        <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-indigo-500 p-4 md:h-40" href="/Home">
          <div className="w-32 text-white md:w-40">
            <ImageLogo />
          </div>
        </Link>
      )}
      <div className="text-center mb-4">
        {isLoggedIn ? (
          <>
            <div className="flex items-center justify-center mb-2 bg-gray-200 h-28 rounded-md">
              <Image
                className="rounded-full w-24 h-24"
                alt="Avatar de usuario"
                src={userData?.picture || '/avatar.webp'}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col h-[100px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
              {userData && (
                <>
                  {userData.nickname && <p className="text-gray-800 text-xl">{userData.nickname}</p>}
                  {userData.email && <p className="text-gray-800 text-base">{userData.email}</p>}
                  {userData.role && <p className="text-gray-800 text-base">{userData.role}</p>}
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-[100px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
            <p className="text-gray-500"><strong>Nombre:</strong></p>
            <p className="text-gray-500"><strong>Email:</strong></p>
          </div>
        )}
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks role={role} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-200 md:block"></div>
        <form className="w-full">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex h-[48px] w-full mb-8 items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-indigo-200 hover:text-indigo-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <FaPowerOff className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SideNav;
