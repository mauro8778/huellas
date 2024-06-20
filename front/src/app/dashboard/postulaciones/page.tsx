'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ToggleActiveShelter from '../../../components/admin/ToggleActiveShelter';
import Swal from 'sweetalert2';
import { decodeJwt } from '@/utils/decodeJwt';

const defaultAvatarUrl = '/shelter.webp';

interface Adoptions {
    id: string;
    date: Date;
    isActive: boolean;
    user: string;
    shelter: string;
    pet: string;
  }

const Postulaciones: React.FC = () => {
  const [adoptions, setAdoptions] = useState<Adoptions[]>([]);
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
    let id:any;

    if(token !== null) {
        const decodedToken = decodeJwt(token)
        id = decodedToken['https://huellasdesperanza.com/userID'];
    }

    const fetchAdoptions = async () => {
      try {
        const response = await fetch(`https://huellasdesperanza.onrender.com/adoptions/shelter/${id}`, {
          method: 'GET',
        });
        
        if (!response.ok) {
          throw new Error('No se pudieron obtener las mascotas.');
        }

       const ndata = await response.json();

       const data: Adoptions[] = ndata.shelter.adoptions;

        console.log(ndata);
        
        const pendingAdoptions = data.filter((adoption: Adoptions) => !adoption.isActive);
        setAdoptions(pendingAdoptions);
      } catch (error) {
        console.error('Error fetching adoptions:', error);
      }
    };

    if (token) {
        fetchAdoptions();
      }
    }, [token]);

  const handleToggle = (adoptionId: string) => {
    setAdoptions(adoptions => adoptions.filter(adoption => adoption.id !== adoptionId));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 max-w-xl bg-white rounded-xl border-t-4 border-lime500 shadow-xl h-[390px] overflow-y-auto custom-scrollbar sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-500 dark:text-white">Adopciones Postuladas</h3>
          
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ml-4 cursor-pointer">
            {adoptions.map((adoption) => (
              <li key={adoption.id} className="py-2 sm:py-3">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                      <Image className="w-8 h-8 rounded-full" src={defaultAvatarUrl} alt="Default Avatar" width={48} height={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-900 truncate dark:text-white">
                      {adoption.user}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {adoption.pet}
                    </p>
                  </div>
                  <ToggleActiveShelter
                    shelterId={adoption.id}
                    initialChecked={adoption.isActive}
                    onToggle={handleToggle}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Postulaciones;
