import React, { ChangeEvent, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onUpload(file);
      uploadFile(file); // Llamamos a la función de subida de archivos aquí
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post('https://huellasdesperanza.onrender.com/files/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Archivo subido con éxito:', response.data);
      Swal.fire("Tu imagen se subió correctamente!");
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setErrorMessage('Error al subir el archivo');
      Swal.fire("Ocurrió un error al subir tu imagen!");
      
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Imagen del Refugio</label>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden border-2 border-lime500"
      />
      <div className="mt-1 flex items-center">
        <input
          type="text"
          readOnly
          value={selectedFile ? selectedFile.name : ''}
          placeholder="Selecciona una imagen..."
          className="mr-2 flex-1 block w-full text-sm text-gray-900 border border-lime500 rounded-xl cursor-pointer bg-gray-50 focus:outline-none px-3 py-2 shadow-xl "
        />
        <button
          type="button"
          onClick={handleClick}
          className=" cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={uploading}
        >
          {uploading ? 'Subiendo...' : 'Seleccionar'}
        </button>
      </div>
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default ImageUpload;
