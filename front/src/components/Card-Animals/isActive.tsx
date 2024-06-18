import React, { useState, useEffect } from 'react';
import CardAnimals from './CardAnimals';
import { IMascotas } from '@/interface/IMascotas';

const AnimalList: React.FC = () => {
  const [mascotas, setMascotas] = useState<IMascotas[]>([]);

  useEffect(() => {
    fetch('https://huellasdesperanza.onrender.com/pets')
      .then(response => response.json())
      .then(data => setMascotas(data))
      .catch(error => console.error('Error fetching mascotas:', error));
  }, []);

  const updateMascota = (updatedMascota: IMascotas) => {
    setMascotas(prevMascotas =>
      prevMascotas.map(mascota =>
        mascota.id === updatedMascota.id ? updatedMascota : mascota
      )
    );
  };

  const deleteMascota = (mascotaId: string) => {
    setMascotas(prevMascotas =>
      prevMascotas.filter(mascota => mascota.id !== mascotaId)
    );
  };

  const activeMascotas = mascotas.filter(mascota => mascota.isActive);

  return (
    <div className="animal-list">
      {activeMascotas.map(mascota => (
        <CardAnimals 
          key={mascota.id} 
          mascota={mascota} 
          updateMascota={updateMascota} 
          deleteMascota={deleteMascota} 
        />
      ))}
    </div>
  );
};

export default AnimalList;
