'use client';
import Logo from "../ui/Logo";
import Search from "./Search";
import NavMenu from "./NavMenu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { decodeJwt } from '@/utils/decodeJwt';
import Image from "next/image";
import { JwtPayload } from "@/types";
import { RiLoginCircleLine } from "react-icons/ri";
import { BiSolidDonateHeart } from "react-icons/bi";
import DesplegableUser from "./desplegable";
import useUserRole from "@/utils/userSession";


const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);
  const [userData, setUserData] = useState<Partial<JwtPayload> | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userRole = useUserRole(); 


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

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <header className="bg-gradient-to-bl from-purple-600 via-blue-500 to-blue-600   
     h-36 flex items-center justify-between px-4 border-4 rounded-xl  ">
      <Logo />
      
      <NavMenu />
      <Search />
      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="flex items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center">
              <button onClick={toggleMenu}>
                <Image
                  className="rounded-full w-12 h-12 border-gray-200 mt-3 border-3 hover:animate-spin"
                  alt="Avatar de usuario"
                  src={userData?.picture || '/avatar.webp'}
                  width={100}
                  height={100}
                />
              </button>
              <DesplegableUser isOpen={isMenuOpen} toggleMenu={toggleMenu} />
              <div className="mt-3 text-sm font-medium text-gray-200 hover:text-pink-300">
                {userData && userData.nickname && (
                  <button className="focus:outline-none" onClick={toggleMenu}>
                    <strong>Hola!</strong> {userData.nickname}
                  </button>
                )}
              </div>
            </div>
            {userRole !== 'Shelter' && (

            <Link href={"/donations"}>
             <button className="m-4 text-4xl text-white mr-6 mb-12 hover:animate-bounce">
              <BiSolidDonateHeart />
            </button>
            </Link>
            )}
           
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
