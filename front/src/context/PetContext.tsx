// context/PetContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Pet = {
  id: string;
  name: string;
  sexo: string;
  breed: string;
  species: string;
  age: number;
  month: string;
  description: string;
  pet_size: string;
  imgUrl: string;
  isCondition: boolean;
};

type PetContextType = {
  pets: Pet[];
  setPets: (pets: Pet[]) => void;
  togglePetCondition: (id: string) => void;
};

const PetContext = createContext<PetContextType>({
  pets: [],
  setPets: () => {},
  togglePetCondition: () => {},
});

export const usePetContext = () => useContext(PetContext);

type PetProviderProps = {
  children: ReactNode;
};

export const PetProvider: React.FC<PetProviderProps> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>([]);

  const togglePetCondition = (id: string) => {
    setPets(pets.map(pet =>
      pet.id === id ? { ...pet, isCondition: !pet.isCondition } : pet
    ));
  };

  return (
    <PetContext.Provider value={{ pets, setPets, togglePetCondition }}>
      {children}
    </PetContext.Provider>
  );
};
