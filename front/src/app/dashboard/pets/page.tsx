/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { IMascotas } from '@/interface/IMascotas';
import withAuth from '@/HOC/withAuth';
import Swal from 'sweetalert2';
import CardAnimals from '@/components/Card-Animals/CardAnimals';

const Adopta = () => {
  const [mascotasState, setMascotasState] = useState<IMascotas[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    const accessToken = userSession ? JSON.parse(userSession).access_token : null;

    if (!accessToken) {
      Swal.fire('No estás autenticado. Por favor, inicia sesión para continuar.');
      return;
    }

    console.log(accessToken);
    
    setToken(accessToken);
  }, []);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await fetch(`https://huellasdesperanza.onrender.com/shelters/id`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('No se pudieron obtener las mascotas.');
        }

        const ndata = await response.json();

        const data: IMascotas[] = ndata.shelter.pets;

        console.log(ndata);

        setMascotasState(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener las mascotas',
          text: 'Hubo un problema al cargar las mascotas. Por favor, inténtalo más tarde.',
        });
      }
    };

    if (token) {
      fetchMascotas();
    }
  }, [token]);

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
        {!loading ? (
          mascotasState.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mascotasState
                .filter(mascota => mascota.isActive) // Filtramos las mascotas activas
                .map(mascota => (
                  <CardAnimals
                    key={mascota.id}
                    mascota={mascota}
                    updateMascota={updateMascota}
                    deleteMascota={deleteMascotaFromList}
                  />
                ))}
            </div>
          ) : (
            <div>No se encontraron mascotas activas con los filtros seleccionados!</div>
          )
        ) : (
          <div>Cargando mascotas...</div>
        )}
      </Suspense>
    </main>
  );
};

export default withAuth(Adopta);
