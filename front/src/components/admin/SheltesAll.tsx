'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ToggleDesactiveShelter from './ToggleDesactiveShelter';

const defaultAvatarUrl = '/shelter.webp';

interface Shelter {
  id: string;
  name: string;
  location: string;
  image?: string;
  description: string;
  isActive: boolean;
}

const SheltersAll: React.FC = () => {
  const [shelters, setShelters] = useState<Shelter[]>([]);

  const fetchShelters = async () => {
    console.log('Obteniendo lista de refugios...');
    try {
      const response = await axios.get<Shelter[]>('https://huellasdesperanza.onrender.com/shelters');
      const activeShelters = response.data.filter(shelter => shelter.isActive);
      setShelters(activeShelters);
      console.log('Lista de refugios actualizada:', activeShelters);
    } catch (error) {
      console.error('Error al obtener los refugios:', error);
    }
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 max-w-xl bg-white rounded-xl border-t-4 border-lime500 shadow-xl h-[390px] overflow-y-auto custom-scrollbar sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-600 dark:text-white">Refugios</h3>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ml-4 cursor-pointer">
            {shelters.map((shelter) => (
              <li key={shelter.id} className="py-2 sm:py-3">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {shelter.image ? (
                      <Image className="w-8 h-8 rounded-full" src={shelter.image} alt={`${shelter.name} image`} width={48} height={48} />
                    ) : (
                      <Image className="w-8 h-8 rounded-full" src={defaultAvatarUrl} alt="Default Avatar" width={48} height={48} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-900 truncate dark:text-white">
                      {shelter.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {shelter.location}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {shelter.description}
                    </p>
                  </div>
                  <ToggleDesactiveShelter
                    shelterId={shelter.id}
                    initialChecked={shelter.isActive}
                    onUpdate={fetchShelters} // Llamar a fetchShelters para actualizar la lista
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

export default SheltersAll;
