import React, { useState, useEffect } from 'react';
import { IMascotas } from '@/interface/IMascotas';
import CardAnimals from './CardAnimals';

const ListaMascotas: React.FC = () => {
  const [mascotas, setMascotas] = useState<IMascotas[]>([]);

  useEffect(() => {
    // Aquí debes cargar la lista inicial de mascotas desde tu API
    fetch('https://huellasdesperanza.onrender.com/pets')
      .then(response => response.json())
      .then(data => setMascotas(data))
      .catch(error => console.error('Error al cargar mascotas:', error));
  }, []);

  const updateMascotaList = (updatedMascota: IMascotas) => {
    setMascotas(prevMascotas => 
      prevMascotas.map(m => m.id === updatedMascota.id ? updatedMascota : m)
    );
  };

  const deleteMascotaFromList = (mascotaId: string) => {
    setMascotas(prevMascotas => prevMascotas.filter(m => m.id !== mascotaId));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
      {mascotas.map((mascota) => (
        <CardAnimals 
          key={mascota.id} 
          mascota={mascota} 
          updateMascota={updateMascotaList} 
          deleteMascota={deleteMascotaFromList}
        />
      ))}
    </div>
  );
};

export default ListaMascotas;
