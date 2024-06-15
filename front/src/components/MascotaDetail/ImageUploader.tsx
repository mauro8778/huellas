// // import React from 'react';
// // import Swal from 'sweetalert2';

// // interface ImageUploaderProps {
// //   petId: string;
// //   onImageUpload: (imageUrl: string) => void;
// //   listImg: string[];
// // }

// // const ImageUploader: React.FC<ImageUploaderProps> = ({ petId, onImageUpload, listImg }) => {
// //   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files?.[0];
// //     if (!file) return;

// //     const MIN_FILE_SIZE = 10 * 1024; // 10 KB
// //     const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// //     if (file.size < MIN_FILE_SIZE) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Archivo demasiado pequeño',
// //         text: 'El tamaño mínimo permitido es de 10KB.',
// //       });
// //       return;
// //     }

// //     if (file.size > MAX_FILE_SIZE) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Archivo demasiado grande',
// //         text: 'El tamaño máximo permitido es de 5MB.',
// //       });
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('file', file);

// //     try {
// //       console.log('Uploading image...');
// //       const response = await fetch('https://huellasdesperanza.onrender.com/files/uploadFile', {
// //         method: 'POST',
// //         body: formData
// //       });

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         console.error(`Error al subir la imagen: ${errorText}`);
// //         throw new Error(`Error al subir la imagen: ${errorText}`);
// //       }

// //       const imageUrl = await response.text();
// //       console.log('Image uploaded successfully:', imageUrl);

// //       const updatedListImg = [...listImg, imageUrl];

// //       const addImgResponse = await fetch(`https://huellasdesperanza.onrender.com/pets/addImg/${petId}`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(updatedListImg),
// //       });

// //       if (addImgResponse.ok) {
// //         Swal.fire({
// //           position: "top-end",
// //           icon: "success",
// //           title: "Imagen agregada correctamente!",
// //           showConfirmButton: false,
// //           timer: 1500
// //         });
// //         onImageUpload(imageUrl);
// //       }

// //       if (!addImgResponse.ok) {
// //         const errorText = await addImgResponse.text();
// //         console.error(`Error al actualizar imágenes: ${errorText}`);
// //         throw new Error(`Error al actualizar imágenes: ${errorText}`);
// //       }

// //       console.log('Pet images updated successfully.');

// //     } catch (error) {
// //       console.error('Error al subir o actualizar imágenes:', error);
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error desconocido',
// //         text: 'Ocurrió un error inesperado al subir la imagen.',
// //       });
// //     }
// //   };

// //   return (
// //     <div className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
// //       <label
// //         htmlFor="file-upload"
// //         className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 cursor-pointer">
// //         Subir imagen.
// //       </label>
// //       <input
// //         id="file-upload"
// //         type="file"
// //         onChange={handleFileUpload}
// //         className="hidden"/>
// //     </div>
// //   );
// // };

// // export default ImageUploader;


import React from 'react';
import Swal from 'sweetalert2';

interface ImageUploaderProps {
  petId: string;
  onImageUpload: (imageUrl: string) => void;
  listImg: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ petId, onImageUpload, listImg }) => {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
        onImageUpload(imageUrl);
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
    <input
      id="file-upload-modal"
      type="file"
      onChange={handleFileUpload}
      className="hidden"
      accept="image/*"
    />
  );
};

export default ImageUploader;

