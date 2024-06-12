import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className='min-h-screen grid grid-cols-1 lg:grid-cols-2 p-5'>
      <section className='hidden h-full lg:flex flex-col items-center justify-center gap-y-5 bg-pink-600 rounded-2xl'>
        <div className='relative w-96 h-96'>
          <Image src='/perritos.jpg' alt='Wallpaper' fill />
        </div>
        <div>
          <h3 className='text-white text-4xl font-semibold text-center mb-5'>
          Estás a un paso de adoptar a tu siguiente mascota. 
          </h3>
          <p className='text-gray-200 text-xl text-center'>
          Juntos podemos darle a cada mascota un hogar lleno de amor. <br /> ¡Tu participación es clave!
          </p>
          <p className='text-gray-300 text-center'>Huellas de Esperanza!</p>
        </div>
      </section>
      {children}
    </main>
  );
};

export default AuthLayout;
