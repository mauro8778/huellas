// /* eslint-disable @next/next/no-img-element */
// import React, { useState } from 'react';
// import { FaMedkit } from 'react-icons/fa';
// import ButtonMedical from '@/components/ui/ButtonMedical'; // Asegúrate de que la ruta sea correcta

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

// interface AnimalCardProps {
//   animal: Animal;
// }

// const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
//   const [condition, setCondition] = useState(animal.isCondition);

//   const toggleCondition = () => {
//     setCondition(prevCondition => !prevCondition);
//     // Aquí podrías agregar lógica adicional para persistir el cambio en la base de datos si es necesario
//   };

//   return (
//     <div className="card">
//       <img src={animal.imgUrl} alt={animal.name} />
//       <h3>{animal.name}</h3>
//       <p>{animal.description}</p>
//       {condition && <FaMedkit />}
//       <ButtonMedical toggleCondition={toggleCondition} isCondition={condition} />
//     </div>
//   );
// };

// export default AnimalCard;
