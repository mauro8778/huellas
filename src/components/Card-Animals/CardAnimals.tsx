import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IMascotas } from '@/interface/IMascotas';
import EditMascota from './EditMascota';
import DeleteMascota from './DeleteMascota';

const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

const CardAnimals: React.FC<{ mascota: IMascotas, updateMascota: (mascota: IMascotas) => void }> = ({ mascota, updateMascota }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMascota, setEditedMascota] = useState<IMascotas>(mascota);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        console.log('Mascota actualizada exitosamente');
        alert('Mascota actualizada exitosamente');
        setIsEditing(false);
        updateMascota(editedMascota);
      } else {
        console.error('Error al actualizar la mascota:', response.statusText);
      }
      
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
    }
  };


  return (
      <>
        <div className="bg-transparent rounded-lg shadow-2xl p-4 m-2 md:m-4 max-w-xs mx-auto transform transition-transform duration-200 hover:scale-105 relative">
          <div className="absolute  top-2 right-2 flex items-center ">
            <button onClick={handleEditClick} className="group mr-2">
                <svg 
                    className=" h-6 w-6 text-gray-500 group-hover:bg-gray-400 rounded-full" 
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
            <DeleteMascota mascotaId={mascota.id} onDelete={() => updateMascota(mascota)} />
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
            <h1 className="text-lg font-semibold mb-2 text-black">{mascota.name}</h1>
            <p className="text-gray-600 mb-2">{mascota.age} Años - {mascota.sexo}</p>
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
