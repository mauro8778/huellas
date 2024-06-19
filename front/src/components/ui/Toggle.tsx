//*Componente para reutilizar ...

"use client"; 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Toggle: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
   
    const fetchInitialState = async () => {
      try {
        const response = await axios.get('/api/CAMBIAME/NO TE OLVIDES'); // URL PARA CAMBIAR
        setIsChecked(response.data.isChecked);
      } catch (error) {
        console.error('Error fetching initial state:', error);
      }
    };

    fetchInitialState();
  }, []);

  const handleToggleChange = async () => {
    setIsChecked(!isChecked);

    try {
      await axios.post('/api/toggle', {
        isChecked: !isChecked,
      });
    } catch (error) {
      console.error('Error updating toggle state:', error);
      
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

export default Toggle;
