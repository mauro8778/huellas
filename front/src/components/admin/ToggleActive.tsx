'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ToggleShelterProps {
  shelterId: string;
}

const ToggleActiveShelter: React.FC<ToggleShelterProps> = ({ shelterId }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const url = `https://huellasdesperanza.onrender.com/shelters/${shelterId}`;
        const response = await axios.get(url);
        setIsActive(response.data.isActive);
      } catch (error) {
        console.error('Error al obtener el estado inicial:', error);
      }
    };

    fetchInitialState();
  }, [shelterId]);

  const handleToggleChange = async () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);

    try {
      const url = `https://huellasdesperanza.onrender.com/shelters/active/${shelterId}`;
      const response = await axios.post(url, { isActive: newActiveState });
      console.log('Estado del refugio actualizado:', response.data);
    } catch (error) {
      console.error('Error al actualizar el estado del refugio:', error);
      setIsActive(!newActiveState);  // Revertir el cambio si hay un error
    }
  };

  return (
    <div>
      <label className="inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          checked={isActive}
          onChange={handleToggleChange}
          className="sr-only peer"
        />
        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
      </label>
    </div>
  );
};

export default ToggleActiveShelter;
