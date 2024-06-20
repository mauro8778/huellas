'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ToggleDeleteUserProps {
  userId: string;
  onDelete: (userId: string) => void;
}

const ToggleDeleteUser: React.FC<ToggleDeleteUserProps> = ({ userId, onDelete }) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      const url = `https://huellasdesperanza.onrender.com/users/delete/${userId}`;
      await axios.post(url);
      Swal.fire({
        title: 'Eliminado',
        text: 'El usuario ha sido eliminado.',
        icon: 'success',
      });
      setIsDeleted(true);
      onDelete(userId);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el usuario.',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <label className="inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          checked={isDeleted}
          onChange={handleDelete}
          className="sr-only peer"
        />
        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
      </label>
    </div>
  );
};

export default ToggleDeleteUser;
