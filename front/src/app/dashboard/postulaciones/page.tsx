'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import axios from 'axios';
import { decodeJwt } from '@/utils/decodeJwt';

const defaultAvatarUrl = '/shelter.webp';

interface Adoption {
  id: string;
  date: Date;
  isActive: boolean;
  user: {
    id: string;
    name: string;
    last_name: string;
    email: string;
    birthdate: string;
    phone: string;
    location: string;
    imgUrl: string;
    isActive: boolean;
  };
  pet: {
    id: string;
    name: string;
    breed: string;
    age: number;
    imgUrl: string;
  };
}

const Postulaciones: React.FC = () => {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
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
    let id: any;

    if (token !== null) {
      const decodedToken = decodeJwt(token);
      id = decodedToken['https://huellasdesperanza.com/userID'];
    }

    const fetchAdoptions = async () => {
      try {
        const response = await fetch(`https://huellasdesperanza.onrender.com/adoption/shelter/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAdoptions(data);
      } catch (error) {
        console.error('Error fetching adoptions:', error);
      }
    };

    if (token) {
      fetchAdoptions();
    }
  }, [token]);

  const handleActivateAdoption = async (adoptionId: string, setDisabled: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      await axios.post(`https://huellasdesperanza.onrender.com/adoption/activate/${adoptionId}`);
      Swal.fire('Alta de adopción confirmada');
      setDisabled(true);  // Disable the button on successful request
    } catch (error) {
      console.error('Error updating adoption state:', error);
      Swal.fire('No se pudo activar la adopción');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 max-w-xl bg-white rounded-xl border-t-4 border-lime500 shadow-xl h-[390px] overflow-y-auto custom-scrollbar sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-500 dark:text-white">Adopciones Postuladas</h3>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ml-4">
            {adoptions.map((adoption) => (
              <li key={adoption.id} className="py-2 sm:py-3">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image className="w-8 h-8 rounded-full" src={defaultAvatarUrl} alt="User Avatar" width={48} height={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-900 truncate dark:text-white">
                      {adoption.user.name} {adoption.user.last_name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {adoption.pet.name} ({adoption.pet.breed})
                    </p>
                  </div>
                  <AdoptionButton adoptionId={adoption.id} handleActivateAdoption={handleActivateAdoption} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

interface AdoptionButtonProps {
  adoptionId: string;
  handleActivateAdoption: (adoptionId: string, setDisabled: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const AdoptionButton: React.FC<AdoptionButtonProps> = ({ adoptionId, handleActivateAdoption }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <button
      onClick={() => handleActivateAdoption(adoptionId, setIsDisabled)}
      disabled={isDisabled}
      className={`px-4 py-2 rounded-lg ${isDisabled ? 'bg-gray-400' : 'bg-blue-600 text-white cursor-pointer'}`}
    >
      {isDisabled ? 'Activado' : 'Activar Adopción'}
    </button>
  );
};

export default Postulaciones;
