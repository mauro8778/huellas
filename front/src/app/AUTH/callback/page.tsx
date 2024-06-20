'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spiner from '@/components/ui/Spiner';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const idToken = urlParams.get('id_token');

    if (accessToken && idToken) {
      localStorage.setItem("userSession", JSON.stringify({ access_token: accessToken, id_token: idToken }));
      console.log('Datos de la sesión del usuario almacenados en localStorage:', { access_token: accessToken, id_token: idToken });

      router.push('/dashboard');
    } else {
      console.error('Tokens not found in the URL');
    }
  }, [router]);

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center" } }>
        <h1 style={ {fontSize: '2.5rem', color: "#6366f1", fontWeight:"bold", marginRight:"1.5rem"} }>Cargando...</h1>
        <Spiner/>
    </div>
    );
};

export default Callback;
