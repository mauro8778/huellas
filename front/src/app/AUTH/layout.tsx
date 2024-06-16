import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className='min-h-screen grid grid-cols-1 lg:grid-cols-2 p-5'>
      <section className='hidden h-full lg:flex flex-col items-center justify-center gap-y-5
      bg-gradient-to-bl from-purple-600 via-indigo-600 to-indigo-500  rounded-2xl'>
        <div className='relative w-96 h-96'>
          <Image src='/perritos.webp' alt='Wallpaper' fill />
        </div>
        <div>
          <h3 className='text-white text-4xl font-semibold text-center mb-5 font-serif'>
         Encuentra tu compañero ideal 
          </h3>
          <p className='text-gray-200 text-xl text-center font-serif'>
          Juntos podemos darle a cada mascota un hogar lleno de amor. <br /> ¡Tu participación es clave!
          </p>
          <p className='text-gray-300 text-center font-semibold'>Huellas de Esperanza!</p>
        </div>
      </section>
      {children}
    </main>
  );
};

export default AuthLayout;
