// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface ToggleUserProps {
//   userId: string;
// }

// const ToggleUser: React.FC<ToggleUserProps> = ({ userId }) => {
//   const [isChecked, setIsChecked] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchInitialState = async () => {
//       try {
//         const url = `https://huellasdesperanza.onrender.com/users/admin/${userId}`;
        
//         console.log('URL de petición GET (para obtener estado):', url);

//         const response = await axios.get(url); // Cambiado a GET para obtener el estado inicial

//         console.log('Estado inicial obtenido:', response.data);
        
//         setIsChecked(response.data.isAdmin); // Usamos isAdmin para determinar si el usuario es administrador
//       } catch (error) {
//         console.error('Error al obtener el estado inicial:', error);
//       }
//     };

//     fetchInitialState();
//   }, [userId]);

//   const handleToggleChange = async () => {
//     const newCheckedState = !isChecked;
//     setIsChecked(newCheckedState);

//     try {
//       const url = `https://huellasdesperanza.onrender.com/users/admin/${userId}`;
//       console.log('URL de petición PUT (para actualizar estado):', url);
//       const response = await axios.put(url, { // Usamos PUT para actualizar el estado
//         isAdmin: newCheckedState, // Actualizamos el estado de isAdmin
//       });
//       console.log('Estado del toggle actualizado:', response.data);
//     } catch (error) {
//       console.error('Error al actualizar el estado del toggle:', error);
//       setIsChecked(!newCheckedState);  // Revertir el cambio si hay un error
//     }
//   };

//   return (
//     <div>
//       <label className="inline-flex items-center mb-5 cursor-pointer">
//         <input
//           type="checkbox"
//           checked={isChecked}
//           onChange={handleToggleChange}
//           className="sr-only peer"
//         />
//         <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//         <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
//       </label>
//     </div>
//   );
// };

// export default ToggleUser;

'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ToggleUserProps {
  userId: string;
  initialRole: string;
  onRoleChange: (userId: string, newRole: string) => void;
}

const ToggleUser: React.FC<ToggleUserProps> = ({ userId, initialRole, onRoleChange }) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialRole === 'admin');

  useEffect(() => {
    const savedState = localStorage.getItem(`user-${userId}-isAdmin`);
    if (savedState !== null) {
      setIsChecked(JSON.parse(savedState));
    } else {
      const fetchInitialState = async () => {
        try {
          const url = `https://huellasdesperanza.onrender.com/users/admin/${userId}`;
          const response = await axios.get(url);
          setIsChecked(response.data.role === 'admin');
        } catch (error) {
          console.error('Error al obtener el estado inicial:', error);
        }
      };
      fetchInitialState();
    }
  }, [userId]);

  const handleToggleChange = async () => {
    const newCheckedState = !isChecked;
    const newRole = newCheckedState ? 'admin' : 'user';
    setIsChecked(newCheckedState);
    localStorage.setItem(`user-${userId}-isAdmin`, JSON.stringify(newCheckedState));

    try {
      const url = `https://huellasdesperanza.onrender.com/users/admin/${userId}`;
      await axios.put(url, { role: newRole });
      Swal.fire({
        title: newCheckedState ? 'Activado' : 'Desactivado',
        text: newCheckedState ? 'El usuario ha sido activado como admin.' : 'El usuario ha sido desactivado como admin.',
        icon: newCheckedState ? 'success' : 'info',
      });
      onRoleChange(userId, newRole);
    } catch (error) {
      console.error('Error al actualizar el estado del toggle:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el estado del usuario.',
        icon: 'error',
      });
      setIsChecked(!newCheckedState);  // Revertir el cambio si hay un error
      localStorage.setItem(`user-${userId}-isAdmin`, JSON.stringify(!newCheckedState));
    }
  };

  return (
    <div>
      <label className="inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggleChange}
          className="sr-only peer"
        />
        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
      </label>
    </div>
  );
};

export default ToggleUser;
