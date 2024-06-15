'use client';
import Logo from "@/components/ui/Logo";
import Search from "@/components/NavBar/Search";
import NavMenu from "@/components/NavBar/NavMenu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { decodeJwt } from '@/utils/decodeJwt';
import Image from "next/image";
import { JwtPayload } from "@/types";
import { RiLoginCircleLine } from "react-icons/ri";
import { BiSolidDonateHeart } from "react-icons/bi";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);
  const [userData, setUserData] = useState<Partial<JwtPayload> | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      const { id_token } = JSON.parse(session);
      if (id_token) {
        const decodedToken = decodeJwt(id_token);
        if (decodedToken) {
          setUserData({
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

  return (
    <header className="bg-gray-950 h-36 flex items-center justify-between px-4 shadow-xl">
      <Logo />
      <NavMenu />
      <Search />
      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="flex items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center">
              <Image
                className="rounded-full w-12 h-12 border-gray-400 mt-3 border-4"
                alt="Avatar de usuario"
                src={userData?.picture || '/avatar.webp'}
                width={100}
                height={100}
              />
              <div className=" mt-3 text-sm font-medium text-gray-200 hover:text-pink-600">
                {userData && userData.nickname && <p><strong>Hola!</strong> {userData.nickname}</p>}
              </div>
            </div>
            <button className="m-4 text-4xl text-white mr-6 mb-12">
              <BiSolidDonateHeart/>
            </button>
          </div>
        ) : (
          <button>
            <Link href="/AUTH/login">
              <div className="text-4xl text-white mr-6">
                <RiLoginCircleLine />
              </div>
            </Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
