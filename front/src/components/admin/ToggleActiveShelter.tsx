"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ToggleActiveShelterProps {
  shelterId: string;
  initialChecked: boolean;
  onToggle: (shelterId: string) => void;
}

const ToggleActiveShelter: React.FC<ToggleActiveShelterProps> = ({ shelterId, initialChecked, onToggle }) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

  const handleToggleChange = async () => {
    setIsChecked(!isChecked);

    try {
      await axios.post(`https://huellasdesperanza.onrender.com/shelters/active/${shelterId}`, {
        isActive: !isChecked,
      });
      Swal.fire('Refugio activado');
      onToggle(shelterId); // Llamamos a la función onToggle para notificar al componente padre PendingShelters
    } catch (error) {
      console.error('Error updating toggle state:', error);
      Swal.fire('No se pudo activar el refugio');
      setIsChecked(isChecked);
    }
  };

  return (
    <div>
      <label className="inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
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
