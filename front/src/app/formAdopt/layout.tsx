import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className='min-h-screen grid grid-cols-1 lg:grid-cols-2 p-5'>
      <section className='hidden h-full lg:flex flex-col items-center justify-center gap-y-5 bg-gradient-to-bl from-purple-600 via-indigo-600 to-indigo-500 rounded-2xl'>
        <div className='relative w-96 h-96'>
        <Image src='/perritos.webp' alt='Mi Logo' width={200} height={100} />
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


// import Image from 'next/image';
// import { FC, ReactNode } from 'react';

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
//   return (
//     <main className='min-h-screen grid grid-cols-1 lg:grid-cols-2 p-5'>
//       <section className='lg:flex lg:flex-col lg:items-start lg:justify-center gap-y-5 bg-pink-600 rounded-2xl'>
//         <div className='hidden lg:block lg:w-96 lg:h-96 lg:self-end lg:mr-5'>
//           <Image src='/doglogin.png' alt='Mi Logo' width={200} height={100} />
//         </div>
//         <div className='ml-5'> 
//           <h3 className='text-white text-4xl font-semibold mt-5 mb-5 text-center'>
//             Estás a un paso de adoptar a tu siguiente mascota.
//           </h3>
//           <p className='text-gray-200 text-xl text-center'>
//             Juntos podemos darle a cada mascota un hogar lleno de amor.
//             <br /> ¡Tu participación es clave!
//           </p>
//           <p className='text-gray-300 text-center mt-5'>Huellas de Esperanza!</p>
//         </div>
//       </section>
//       {children}
//     </main>
//   );
// };

// export default AuthLayout;
