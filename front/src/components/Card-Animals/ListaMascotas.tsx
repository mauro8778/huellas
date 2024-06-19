

import React from 'react';
import { IMascotas } from '@/interface/IMascotas';
import CardAnimals from './CardAnimals';

interface ListaMascotasProps {
  mascotas: IMascotas[];
  updateMascota: (updatedMascota: IMascotas) => void;
  deleteMascota: (mascotaId: string) => void;
}

const ListaMascotas: React.FC<ListaMascotasProps> = ({ mascotas, updateMascota, deleteMascota }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
      {mascotas.map((mascota) => (
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

export default ListaMascotas;
