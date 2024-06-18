'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import ToggleShelter from './ToggleShelter';

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

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get<Shelter[]>('https://huellasdesperanza.onrender.com/shelters');
        const activeShelters = response.data.filter(shelter => shelter.isActive);
        setShelters(activeShelters);
      } catch (error) {
        console.error('Error fetching shelters:', error);
      }
    };

    fetchShelters();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 max-w-xl bg-white rounded-xl border shadow-xl h-[390px] overflow-y-auto custom-scrollbar sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-600 dark:text-white">Refugios</h3>
          <Link href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            Ver todos
          </Link>
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
                  <ToggleShelter shelterId={shelter.id}/>
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
