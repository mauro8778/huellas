'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavLinks from './nav_links';
import { FaPowerOff } from 'react-icons/fa';
import ImageLogo from '@/components/ui/imageLogo';
import Image from 'next/image';
import { decodeJwt } from '@/utils/decodeJwt';
import { JwtPayload } from '@/types/index';

const SideNav: React.FC = () => {
  const [userData, setUserData] = useState<Partial<JwtPayload> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);

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
          });
          setIsLoggedIn(true);
          setIsGoogleAuthenticated(true);
        }
      }
    } else {
      setIsLoggedIn(false);
      setIsGoogleAuthenticated(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userSession');
    // localStorage.removeItem('donations');
    // localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
    setIsGoogleAuthenticated(false);
    window.location.href = '/Home'; // Pruevo con este metodo
  };

  return (
    <div className="flex h-full flex-col px-3 w-64 py-4 md:px-2 m-0 p-0">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40" href="/Home">
        <div className="w-32 text-white md:w-40">
          <ImageLogo />
        </div>
      </Link>
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
                  {userData.name && <p className="text-gray-800 text-base">{userData.name}</p>}
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
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-200 md:block"></div>
        <form className="w-full">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex h-[48px] w-full mb-8 items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-pink-200 hover:text-pink-600 md:flex-none md:justify-start md:p-2 md:px-3"
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
