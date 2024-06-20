// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IMascotas } from '@/interface/IMascotas';
// import EditMascota from './EditMascota';
// import DeleteMascota from './DeleteMascota';

// const truncateDescription = (text: string, maxLength: number) => {
//   if (text.length <= maxLength) return text;
//   return text.substr(0, maxLength) + '...';
// };

// const CardAnimals: React.FC<{ 
//   mascota: IMascotas, 
//   updateMascota: (mascota: IMascotas) => void,
//   deleteMascota: (mascotaId: string) => void 
// }> = ({ mascota, updateMascota, deleteMascota }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedMascota, setEditedMascota] = useState<IMascotas>(mascota);

//   const truncatedDescription = mascota.description ? truncateDescription(mascota.description, 25) : '';

//   useEffect(() => {
//     setEditedMascota(mascota);
//   }, [mascota]);

//   const imgUrl = mascota.imgUrl!.startsWith('http://') || mascota.imgUrl!.startsWith('https://')
//     ? mascota.imgUrl
//     : `/${mascota.imgUrl}`;

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleModalClose = () => {
//     setIsEditing(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setEditedMascota(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setEditedMascota(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const response = await fetch(`https://huellasdesperanza.onrender.com/pets/${mascota.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(editedMascota)
//       });

//       if (response.ok) {
//         console.log('Mascota actualizada exitosamente!');
//         alert('Mascota actualizada exitosamente');
//         setIsEditing(false);
//         updateMascota(editedMascota);
//       } else {
//         console.error('Error al actualizar la mascota:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error al actualizar la mascota:', error);
//     }
//   };

//   return (
//     <>
//       <div className="bg-transparent rounded-lg shadow-2xl p-4 m-2 md:m-4 max-w-xs mx-auto transform transition-transform duration-200 hover:scale-105 relative">
//         <div className="absolute  top-2 right-2 flex items-center ">
//           <button onClick={handleEditClick} className="group mr-2">
//             <svg 
//               className=" h-6 w-6 text-gray-500 group-hover:bg-gray-400 rounded-full" 
//               viewBox="0 0 24 24"  
//               fill="none"  
//               stroke="currentColor"  
//               strokeWidth="2"  
//               strokeLinecap="round"  
//               strokeLinejoin="round">
//               <circle cx="12" cy="12" r="1" />
//               <circle cx="19" cy="12" r="1" />
//               <circle cx="5" cy="12" r="1" />
//             </svg>
//           </button>
//           <DeleteMascota mascotaId={mascota.id} onDelete={deleteMascota} />
//         </div>

//         <Link href={`/adopta/${mascota.id}`}>
//           <div className="flex justify-center mt-5">
//             {mascota.imgUrl && (
//               <Image
//                 src={imgUrl!}
//                 alt={mascota.name!}
//                 width={150}
//                 height={150}
//                 className="w-full h-48 object-cover rounded-t-md" 
//                 priority
//               />
//             )}
//           </div>
//           <div className="p-4">
//             <h1 className="text-lg font-semibold mb-2 text-black">{mascota.name}</h1>
//             <p className="text-gray-600 mb-2">{mascota.age} {mascota.month}  - {mascota.sexo}</p>
//             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 min-h-10">{truncatedDescription}</p>
//           </div>
//         </Link>
//       </div>

//       {isEditing && (
//         <EditMascota
//           editedMascota={editedMascota}
//           handleInputChange={handleInputChange}
//           handleSelectChange={handleSelectChange}
//           handleSaveChanges={handleSaveChanges}
//           handleModalClose={handleModalClose}
//         />
//       )}
//     </>
//   );
// };

// export default CardAnimals;

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IMascotas } from '@/interface/IMascotas';
import EditMascota from './EditMascota';
import DeleteMascota from './DeleteMascota';
import Swal from 'sweetalert2';
import useUserRole from '@/utils/userSession';

const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

const CardAnimals: React.FC<{ 
  mascota: IMascotas, 
  updateMascota: (mascota: IMascotas) => void,
  deleteMascota: (mascotaId: string) => void 
}> = ({ mascota, updateMascota, deleteMascota }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMascota, setEditedMascota] = useState<IMascotas>(mascota);
  const userRole = useUserRole(); 

  


  const truncatedDescription = mascota.description ? truncateDescription(mascota.description, 25) : '';

  useEffect(() => {
    setEditedMascota(mascota);
  }, [mascota]);

  const imgUrl = mascota.imgUrl!.startsWith('http://') || mascota.imgUrl!.startsWith('https://')
    ? mascota.imgUrl
    : `/${mascota.imgUrl}`;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleModalClose = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedMascota(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedMascota(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`https://huellasdesperanza.onrender.com/pets/${mascota.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedMascota)
      });

      if (response.ok) {
        console.log('Mascota actualizada exitosamente!');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Mascota actualizada exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
        setIsEditing(false);
        updateMascota(editedMascota);
      } else {
        console.error('Error al actualizar la mascota:', response.statusText);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar la mascota. Por favor, inténtalo de nuevo.'
        });
      }
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar la mascota. Por favor, inténtalo de nuevo.'
      });
    }
  };

  return (
    <>
      <div className="bg-gray-50 rounded-xl border-t-4 border-lime500 shadow-xl p-4 m-2 md:m-4 max-w-xs mx-auto transform transition-transform duration-200 hover:scale-105 relative">
        <div className="absolute  top-2 right-2 flex items-center ">
        {userRole !== 'User' && (
          <button onClick={handleEditClick} className="group mr-2  ">
            <svg 
              className=" h-6 w-6 text-lime500 group-hover:text-lime-400 rounded-full" 
            viewBox="0 0 24 24"  
          fill="none"  
        stroke="currentColor"  
      strokeWidth="2"  
    strokeLinecap="round"  
  strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
              )}
          {userRole === 'User' && (

          <DeleteMascota mascotaId={mascota.id} onDelete={deleteMascota} />
)}

        </div>

        <Link href={`/adopta/${mascota.id}`}>
          <div className="flex justify-center mt-5">
            {mascota.imgUrl && (
              <Image
                src={imgUrl!}
                alt={mascota.name!}
                width={150}
                height={150}
                className="w-full h-48 object-cover rounded-t-md" 
                priority
              />
            )}
          </div>
          <div className="p-4">
            <h1 className="text-lg font-semibold mb-2 text-gray-800">{mascota.name}</h1>
            <p className="text-gray-600 mb-2">{mascota.age} {mascota.month}  - {mascota.sexo}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 min-h-10">{truncatedDescription}</p>
          </div>
        </Link>
      </div>

      {isEditing && (
        <EditMascota
          editedMascota={editedMascota}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSaveChanges={handleSaveChanges}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
};

export default CardAnimals;
