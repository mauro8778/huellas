// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import FavoriteStar from './FavoriteStar';
// import { IMascotas } from '@/interface/IMascotas';
// import Swal from 'sweetalert2';

// export const MascotaDetail: React.FC<IMascotas & { petId: string }> = ({
//   name,
//   age,
//   description,
//   imgUrl,
//   listImg: initialListImg,
//   breed,
//   sexo,
//   pet_size,
//   petId
// }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [listImg, setListImg] = useState(initialListImg || []);

//   const handleToggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   const images = [];
//   if (imgUrl) images.push(imgUrl);
//   if (listImg) images.push(...listImg);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
  
//     const formData = new FormData();
//     formData.append('file', file);
  
//     try {
//       console.log('Uploading image...');
//       const response = await fetch('https://huellasdesperanza.onrender.com/files/uploadFile', {
//         method: 'POST',
//         body: formData
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`Error al subir la imagen: ${errorText}`);
//         throw new Error(`Error al subir la imagen: ${errorText}`);
//       }
  
//       const imageUrl = await response.text();
//       console.log('Image uploaded successfully:', imageUrl);
  
//       const updatedListImg = [...listImg, imageUrl];
//       setListImg(updatedListImg);
  
//       console.log('Updating pet images with data:', updatedListImg);
  
//       const addImgResponse = await fetch(`https://huellasdesperanza.onrender.com/pets/addImg/${petId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedListImg),
//       });

//       if (addImgResponse.ok) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Imagen agregada correctamente!",
//           showConfirmButton: false,
//           timer: 1500
//         });
//       }
  
//       if (!addImgResponse.ok) {
//         const errorText = await addImgResponse.text();
//         console.error(`Error al actualizar imágenes: ${errorText}`);
//         throw new Error(`Error al actualizar imágenes: ${errorText}`);
//       }
  
//       console.log('Pet images updated successfully.');
  
//     } catch (error) {
//       console.error('Error al subir o actualizar imágenes:', error);
//     }
//   };
  
// return (
//   <>
//     <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
//       <div className="col-span-1 md:col-span-2 flex justify-center relative">
//         <div className="relative w-[700px] h-[500px] overflow-hidden">
//           <Carousel>
//             {images.map((image, index) => (
//               <div key={index} >
//                 <Image
//                   src={image}
//                   alt={`${name ?? 'Imagen'} ${index + 1}`}
//                   width={400}
//                   height={300}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </Carousel>
//           <div className="absolute top-2 right-2">
//             <FavoriteStar
//               isFavorite={isFavorite}
//               onToggleFavorite={handleToggleFavorite}
//               isLoggedIn
//               petId={petId}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="col-span-1 px-5 shadow-xl m-5">
//         <h1 className="antialiased font-bold text-xl">Te presentamos a {name}</h1>
//         <h3>Su edad es de {age} años</h3>
//         <h3>Raza {breed}</h3>
//         <h3>{sexo}</h3>
//         <h3>{pet_size}</h3>
//         <Link
//           href={`/formAdopt`}
//           className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
//         >
//           <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//             Postular
//           </span>
//         </Link>
//         <h3 className="font-bold text-sm">Descripción:</h3>
//         <p className="font-light">{description}</p>
//         <input type="file" onChange={handleFileUpload} className="mt-5" />
//       </div>
//     </div>
//   </>
// );
// }

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FavoriteStar from './FavoriteStar';
import { IMascotas } from '@/interface/IMascotas';
import Swal from 'sweetalert2';

export const MascotaDetail: React.FC<IMascotas & { petId: string }> = ({
  name,
  age,
  description,
  imgUrl,
  listImg: initialListImg,
  breed,
  sexo,
  pet_size,
  petId
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [listImg, setListImg] = useState(initialListImg || []);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const images = [];
  if (imgUrl) images.push(imgUrl);
  if (listImg) images.push(...listImg);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Preguntar cuanto es el tamaño maximo, ya que por consola dice que el minimo es de 5kb
    const MIN_FILE_SIZE = 10 * 1024; // 10 KB
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    if (file.size < MIN_FILE_SIZE) {
      Swal.fire({
        icon: 'error',
        title: 'Archivo demasiado pequeño',
        text: 'El tamaño mínimo permitido es de 10KB.',
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'error',
        title: 'Archivo demasiado grande',
        text: 'El tamaño máximo permitido es de 5MB.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Uploading image...');
      const response = await fetch('https://huellasdesperanza.onrender.com/files/uploadFile', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error al subir la imagen: ${errorText}`);
        throw new Error(`Error al subir la imagen: ${errorText}`);
      }

      const imageUrl = await response.text();
      console.log('Image uploaded successfully:', imageUrl);

      const updatedListImg = [...listImg, imageUrl];
      setListImg(updatedListImg);

      console.log('Updating pet images with data:', updatedListImg);

      const addImgResponse = await fetch(`https://huellasdesperanza.onrender.com/pets/addImg/${petId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedListImg),
      });

      if (addImgResponse.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Imagen agregada correctamente!",
          showConfirmButton: false,
          timer: 1500
        });
      }

      if (!addImgResponse.ok) {
        const errorText = await addImgResponse.text();
        console.error(`Error al actualizar imágenes: ${errorText}`);
        throw new Error(`Error al actualizar imágenes: ${errorText}`);
      }

      console.log('Pet images updated successfully.');

    } catch (error) {
      console.error('Error al subir o actualizar imágenes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error desconocido',
        text: 'Ocurrió un error inesperado al subir la imagen.',
      });
    }
  };

  return (
    <>
      <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-1 md:col-span-2 flex justify-center relative">
          <div className="relative w-[700px] h-[500px] overflow-hidden">
            <Carousel>
              {images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={`${name ?? 'Imagen'} ${index + 1}`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </Carousel>
            <div className="absolute top-2 right-2">
              <FavoriteStar
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                isLoggedIn
                petId={petId}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 px-5 shadow-xl m-5">
          <h1 className="antialiased font-bold text-xl">Te presentamos a {name}</h1>
          <h3>Su edad es de {age} años</h3>
          <h3>Raza {breed}</h3>
          <h3>{sexo}</h3>
          <h3>{pet_size}</h3>
          <Link
            href={`/formAdopt`}
            className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Postular
            </span>
          </Link>
          <h3 className="font-bold text-sm">Descripción:</h3>
          <p className="font-light">{description}</p>
          <input type="file" onChange={handleFileUpload} className="mt-5" />
        </div>
      </div>
    </>
  );
};
