// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AnimalCard from './AnimalCard';
// import ButtonMedical from '../ui/ButtonMedical';

// interface Shelter {
//   id: string;
//   name: string;
//   email: string;
//   dni: number;
//   phone: number;
//   shelter_name: string;
//   address: string;
//   lat: number;
//   lon: number;
//   display_name: string;
//   description: string;
//   imgUrl: string;
//   exotic_animals: boolean;
//   isActive: boolean;
//   rate: any;
// }

// interface Animal {
//   id: string;
//   name: string;
//   sexo: string;
//   breed: string;
//   species: string;
//   age: number;
//   month: string;
//   description: string;
//   pet_size: string;
//   imgUrl: string;
//   listImg: string | null;
//   godfather: string | null;
//   isCondition: boolean;
//   isActive: boolean;
//   shelter: Shelter;
// }

// const RandomMedicalCards: React.FC = () => {
//   const [animals, setAnimals] = useState<Animal[]>([]);

//   useEffect(() => {
//     const fetchAnimals = async () => {
//       try {
//         const response = await axios.get('https://huellasdesperanza.onrender.com/pets');
//         setAnimals(response.data);
//       } catch (error) {
//         console.error('Error fetching animals', error);
//       }
//     };

//     fetchAnimals();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       {animals.map(animal => (
//         <AnimalCard key={animal.id} animal={animal} />
//       ))}
//         <div>
//             <ButtonMedical toggleCondition={function (): void {
//                   throw new Error('Function not implemented.');
//               } } isCondition={false} />
//         </div>

//     </div>
    
//   );
// };

// export default RandomMedicalCards;
