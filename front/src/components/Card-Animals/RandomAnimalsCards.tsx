'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardAnimals from './CardAnimals';
import { IMascotas } from '@/interface/IMascotas';

const RandomAnimalCards: React.FC = () => {
  const [randomMascotas, setRandomMascotas] = useState<IMascotas[]>([]);
  const router = useRouter();

  const selectRandomMascotas = (mascotas: IMascotas[]) => {
    const shuffled = [...mascotas].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    setRandomMascotas(selected);
  };

  useEffect(() => {
    fetch("https://huellasdesperanza.onrender.com/pets")
      .then(response => response.json())
      .then(data => selectRandomMascotas(data))
      .catch(error => console.error("Error fetching mascotas:", error));
  }, []);

  const updateMascota = (mascota: IMascotas) => {
    console.log('Mascota actualizada:', mascota);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-5 mb-5">
      {randomMascotas.map((mascota, index) => (
        <CardAnimals key={index} mascota={mascota} updateMascota={updateMascota} />
      ))}
    </div>
  );
};

export default RandomAnimalCards;
