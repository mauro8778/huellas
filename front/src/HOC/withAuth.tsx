// // src/hoc/withAuth.tsx
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const isAuthenticated = (): boolean => {
//   if (typeof window === 'undefined') return false;
//   const token = localStorage.getItem('userSession');
//   return !!token; // Devuelve true si hay un token, false de lo contrario
// };

// const withAuth = (WrappedComponent: React.FC) => {
//   const Wrapper: React.FC = (props) => {
//     const router = useRouter();

//     useEffect(() => {
//       if (!isAuthenticated()) {
//         router.replace('/AUTH/login'); // Redirige a la página de login si no está autenticado
//       }
//     }, []);

//     return isAuthenticated() ? <WrappedComponent {...props} /> : null;
//   };

//   return Wrapper;
// };

// export default withAuth;


// src/hoc/withAuth.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spiner from '@/components/ui/Spiner';
import Swal from 'sweetalert2';

const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('userSession');
  return !!token; // Devuelve true si hay un token, false de lo contrario
};

const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isAuthenticated()) {

        router.replace('/AUTH/login');
        Swal.fire('¡ Por favor, inicia sesión.'); // Redirige a la página de login si no está autenticado
      } else {
        setLoading(false); // Usuario autenticado, detener carga
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
      return <Spiner />; // Mostrar estado de carga mientras se verifica la autenticación
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
