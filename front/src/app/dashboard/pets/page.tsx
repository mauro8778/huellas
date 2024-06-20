'use client';


import React, { useState, useEffect, lazy, Suspense } from 'react';
import { IMascotas } from '@/interface/IMascotas';
import withAuth from '@/HOC/withAuth';
import Swal from 'sweetalert2';

const ListaMascotas = lazy(() => import('@/components/Card-Animals/ListaMascotas'));

const Adopta = () => {
  const [mascotasState, setMascotasState] = useState<IMascotas[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    const accessToken = userSession ? JSON.parse(userSession).access_token : null;

    if (!accessToken) {
      Swal.fire('No estás autenticado. Por favor, inicia sesión para continuar.');
      return;
    }

    setToken(accessToken);
  }, []);

  

  useEffect(() => {
    const mapPets = async () => {
      const response = await fetch(`https://huellasdesperanza.onrender.com/shelters/:id`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },})
        console.log(token);
        

        const Data = await response.json()

        console.log(Data);
        
        setMascotasState(Data)
      }
      mapPets()
    })
      
  

  const updateMascota = (updatedMascota: IMascotas) => {
    setMascotasState(prevState =>
      prevState.map(mascota =>
        mascota.id === updatedMascota.id ? updatedMascota : mascota
      )
    );
  };

  const deleteMascotaFromList = (mascotaId: string) => {
    setMascotasState(prevState => prevState.filter(m => m.id !== mascotaId));
  };


  return (
    <main className="flex flex-col items-center bg-gray-300">
      <Suspense fallback={<div>Cargando mascotas...</div>}>
        {mascotasState.length > 0 ? (
          <ListaMascotas 
            mascotas={mascotasState} 
            updateMascota={updateMascota}
            deleteMascota={deleteMascotaFromList}
          />
        ) : (
          <div>No se encontraron mascotas con los filtros seleccionados!</div>
        )}
      </Suspense>

    </main>
  );
};

export default withAuth(Adopta);
