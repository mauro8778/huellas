// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import FavoriteStar from './FavoriteStar';
// import { IMascotas } from '@/interface/IMascotas';
// import ImageUploader from './ImageUploader';
// import ModalMascotaDetail from './ModalMascotaDetail';

// export const MascotaDetail: React.FC<IMascotas & { petId: string }> = ({
//   name,
//   age,
//   description,
//   imgUrl,
//   listImg: initialListImg,
//   breed,
//   sexo,
//   pet_size,
//   petId,
//   month,
  
// }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [listImg, setListImg] = useState(initialListImg || []);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleToggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleImageUpload = (imageUrl: string) => {
//     setListImg((prevListImg) => [...prevListImg, imageUrl]);
//   };

//   const handleImageDelete = (index: number) => {
//     setListImg((prevListImg) => prevListImg.filter((_, i) => i !== index));
//   };

//   const images = [];
//   if (imgUrl) images.push(imgUrl);
//   if (listImg) images.push(...listImg);

//   return (
//     <>
//       <div className="mt-5 mb-20 ml-5 grid grid-cols-1 md:grid-cols-3 gap-3">
//         <div className="col-span-1 md:col-span-2 flex justify-center relative">
//           <div className="relative w-[700px] h-[500px] overflow-hidden">
//             <Carousel>
//               {images.map((image, index) => (
//                 <div key={index} className="relative group cursor-pointer" onClick={handleOpenModal}>
//                   <Image
//                     src={image}
//                     alt={`${name ?? 'Imagen'} ${index + 1}`}
//                     width={400}
//                     height={300}
//                     className="object-cover w-full h-full"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
//                     <FontAwesomeIcon icon={faCamera} className="text-white opacity-0 group-hover:opacity-100 transition duration-300" size="2x" />
//                   </div>
//                 </div>
//               ))}
//             </Carousel>
//             <div className="absolute top-2 right-2">
//               <FavoriteStar
//                 isFavorite={isFavorite}
//                 onToggleFavorite={handleToggleFavorite}
//                 isLoggedIn
//                 petId={petId}/>
//             </div>
//           </div>
//         </div>
//         <div className="col-span-1 px-5 shadow-xl m-5">
//           <h1 className="antialiased font-bold text-xl">Te presentamos a {name}</h1>
//           <h3>Su edad es de {age}  {month} </h3>
//           <h3>Raza {breed}</h3>
//           <h3>{sexo}</h3>
//           <h3>{pet_size}</h3>
//           <Link
//             href={`/formAdopt?petId=${petId}`}
//             className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
//             <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//               Postular
//             </span>
//           </Link>

//           <h3 className="font-bold text-sm">Descripción:</h3>
//           <p className="font-light">{description}</p>
//         </div>
//       </div>
//       <ModalMascotaDetail isOpen={isModalOpen} onClose={handleCloseModal}>
//         <h2 className="text-xl mb-4 text-center">Editar fotos</h2>
//         <div className="flex flex-col  space-y-2 items-center">
//           <label htmlFor="file-upload-modal" className="text-blue-500 hover:underline cursor-pointer">
//             Subir foto
//           </label>
//           <ImageUploader petId={petId} onImageUpload={handleImageUpload} listImg={listImg} />
          
//             <div className="flex items-center">
//               <Link href="#" >
//                 Eliminar foto
//               </Link>
//             </div>
          
//         </div>
//       </ModalMascotaDetail>
//     </>
//   );
// };


// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import FavoriteStar from './FavoriteStar';
// import { IMascotas } from '@/interface/IMascotas';
// import ImageUploader from './ImageUploader';
// import ModalMascotaDetail from './ModalMascotaDetail';

// export const MascotaDetail: React.FC<IMascotas & { petId: string }> = ({
//   name,
//   age,
//   description,
//   imgUrl,
//   listImg: initialListImg,
//   breed,
//   sexo,
//   pet_size,
//   petId,
//   month,
  
// }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [listImg, setListImg] = useState(initialListImg || []);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const favoritePets = JSON.parse(localStorage.getItem('favoritePets') || '{}');
//     if (favoritePets[petId]) {
//       setIsFavorite(true);
//     }
//   }, [petId]);

//   const handleToggleFavorite = (petId: string, newFavoriteStatus: boolean) => {
//     setIsFavorite(newFavoriteStatus);
//     const favoritePets = JSON.parse(localStorage.getItem('favoritePets') || '{}');
//     if (newFavoriteStatus) {
//       favoritePets[petId] = true;
//     } else {
//       delete favoritePets[petId];
//     }
//     localStorage.setItem('favoritePets', JSON.stringify(favoritePets));
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleImageUpload = (imageUrl: string) => {
//     setListImg((prevListImg) => [...prevListImg, imageUrl]);
//   };

//   const handleImageDelete = (index: number) => {
//     setListImg((prevListImg) => prevListImg.filter((_, i) => i !== index));
//   };

//   const images = [];
//   if (imgUrl) images.push(imgUrl);
//   if (listImg) images.push(...listImg);

//   return (
//     <>
//       <div className="mt-5 mb-20 ml-5 grid grid-cols-1 md:grid-cols-3 gap-3">
//         <div className="col-span-1 md:col-span-2 flex justify-center relative">
//           <div className="relative w-[700px] h-[500px] overflow-hidden">
//             <Carousel>
//               {images.map((image, index) => (
//                 <div key={index} className="relative group cursor-pointer" onClick={handleOpenModal}>
//                   <Image
//                     src={image}
//                     alt={`${name ?? 'Imagen'} ${index + 1}`}
//                     width={400}
//                     height={300}
//                     className="object-cover w-full h-full"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
//                     <FontAwesomeIcon icon={faCamera} className="text-white opacity-0 group-hover:opacity-100 transition duration-300" size="2x" />
//                   </div>
//                 </div>
//               ))}
//             </Carousel>
//             <div className="absolute top-2 right-2">
//               <FavoriteStar
//                 isFavorite={isFavorite}
//                 onToggleFavorite={handleToggleFavorite}
//                 isLoggedIn
//                 petId={petId}/>
//             </div>
//           </div>
//         </div>
//         <div className="col-span-1 px-5 shadow-xl m-5">
//           <h1 className="antialiased font-bold text-xl">Te presentamos a {name}</h1>
//           <h3>Su edad es de {age}  {month} </h3>
//           <h3>Raza {breed}</h3>
//           <h3>{sexo}</h3>
//           <h3>{pet_size}</h3>
//           <Link
//             href={`/formAdopt?petId=${petId}`}
//             className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
//             <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//               Postular
//             </span>
//           </Link>

//           <h3 className="font-bold text-sm">Descripción:</h3>
//           <p className="font-light">{description}</p>
//         </div>
//       </div>
//       <ModalMascotaDetail isOpen={isModalOpen} onClose={handleCloseModal}>
//         <h2 className="text-xl mb-4 text-center">Editar fotos</h2>
//         <div className="flex flex-col  space-y-2 items-center">
//           <label htmlFor="file-upload-modal" className="text-blue-500 hover:underline cursor-pointer">
//             Subir foto
//           </label>
//           <ImageUploader petId={petId} onImageUpload={handleImageUpload} listImg={listImg} />
          
//             <div className="flex items-center">
//               <Link href="#" >
//                 Eliminar foto
//               </Link>
//             </div>
          
//         </div>
//       </ModalMascotaDetail>
//     </>
//   );
// };


import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import FavoriteStar from './FavoriteStar';
import { IMascotas } from '@/interface/IMascotas';
import ImageUploader from './ImageUploader';
import ModalMascotaDetail from './ModalMascotaDetail';
import useUserRole from '@/utils/userSession';

export const MascotaDetail: React.FC<IMascotas & { petId: string }> = ({
  name,
  age,
  description,
  imgUrl,
  listImg: initialListImg,
  breed,
  sexo,
  pet_size,
  petId,
  month,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [listImg, setListImg] = useState(initialListImg || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = useUserRole(); 

  useEffect(() => {
    const favoritePets = JSON.parse(localStorage.getItem('favoritePets') || '{}');
    if (favoritePets[petId]) {
      setIsFavorite(true);
    }
  }, [petId]);

  const handleToggleFavorite = (petId: string, newFavoriteStatus: boolean) => {
    setIsFavorite(newFavoriteStatus);
    const favoritePets = JSON.parse(localStorage.getItem('favoritePets') || '{}');
    if (newFavoriteStatus) {
      favoritePets[petId] = true;
    } else {
      delete favoritePets[petId];
    }
    localStorage.setItem('favoritePets', JSON.stringify(favoritePets));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = (imageUrl: string) => {
    setListImg((prevListImg) => [...prevListImg, imageUrl]);
  };

  const handleImageDelete = (index: number) => {
    setListImg((prevListImg) => prevListImg.filter((_, i) => i !== index));
  };

  const images = [];
  if (imgUrl) images.push(imgUrl);
  if (listImg) images.push(...listImg);

  return (
    <>
      <div className="mt-5 mb-20 ml-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-1 md:col-span-2 flex justify-center relative">
          <div className="relative w-[700px] h-[500px] overflow-hidden">
            <Carousel>
              {images.map((image, index) => (
                <div key={index} className="relative group cursor-pointer" onClick={handleOpenModal}>
                  <Image
                    src={image}
                    alt={`${name ?? 'Imagen'} ${index + 1}`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
                    <FontAwesomeIcon icon={faCamera} className="text-white opacity-0 group-hover:opacity-100 transition duration-300" size="2x" />
                  </div>
                </div>
              ))}
            </Carousel>

            {userRole !== 'Shelter' && (
            <div className="absolute top-2 right-2">
              <FavoriteStar
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                isLoggedIn
                petId={petId}/>
            </div>

)}


            
          </div>
        </div>
        <div className="col-span-1 px-5 shadow-xl m-5">
          <h1 className="antialiased font-bold text-xl">Te presentamos a {name}</h1>
          <h3>Su edad es de {age}  {month} </h3>
          <h3>Raza {breed}</h3>
          <h3>{sexo}</h3>
          <h3>{pet_size}</h3>
          {userRole !== 'Shelter' && (
            <Link
              href={`/formAdopt?petId=${petId}`}
              className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Postular
              </span>
            </Link>
          )}
          <h3 className="font-bold text-sm">Descripción:</h3>
          <p className="font-light">{description}</p>
        </div>
      </div>
      <ModalMascotaDetail isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl mb-4 text-center">Editar fotos</h2>
        <div className="flex flex-col  space-y-2 items-center">
          <label htmlFor="file-upload-modal" className="text-blue-500 hover:underline cursor-pointer">
            Subir foto
          </label>
          <ImageUploader petId={petId} onImageUpload={handleImageUpload} listImg={listImg} />
          <div className="flex items-center">
            <Link href="#" >
              Eliminar foto
            </Link>
          </div>
        </div>
      </ModalMascotaDetail>
    </>
  );
};
