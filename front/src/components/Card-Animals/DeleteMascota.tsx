// import React from 'react';

// const DeleteMascota: React.FC<{ mascotaId?: string, onDelete: (mascotaId: string) => void }> = ({ mascotaId, onDelete }) => {
//   const handleDeleteClick = async () => {
//     if (mascotaId) {
//       if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
//         try {
//           const response = await fetch(
//             `https://huellasdesperanza.onrender.com/pets/delete/${mascotaId}`,
//             {
//               method: "POST",
//             }
//           );

//           if (response.ok) {
//             console.log("Mascota eliminada exitosamente!!");
//             alert("Mascota eliminada exitosamente");
//             onDelete(mascotaId); 
//           } else {
//             console.error(
//               "Error al eliminar la mascota:",
//               response.statusText
//             );
//           }
//         } catch (error) {
//           console.error("Error al eliminar la mascota:", error);
//         }
//       }
//     } else {
//       console.error("La mascotaId es undefined");
//     }
//   };

//   return (
//     <button onClick={handleDeleteClick} className="group">
//       <svg
//         className="rounded-full h-6 w-6 text-gray-500 group-hover:bg-gray-400"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor">
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M6 18L18 6M6 6l12 12"/>
//       </svg>
//     </button>
//   );
// };

// export default DeleteMascota;


import React from 'react';
import Swal from 'sweetalert2';

const DeleteMascota: React.FC<{ mascotaId?: string, onDelete: (mascotaId: string) => void }> = ({ mascotaId, onDelete }) => {
  const handleDeleteClick = async () => {
    if (mascotaId) {
      const result = await Swal.fire({
        title: '¿Estás seguro de que quieres eliminar esta mascota?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarla!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://huellasdesperanza.onrender.com/pets/delete/${mascotaId}`,
            {
              method: "POST",
            }
          );

          if (response.ok) {
            console.log("Mascota eliminada exitosamente!!");
            Swal.fire(
              'Eliminada!',
              'La mascota ha sido eliminada exitosamente.',
              'success'
            );
            onDelete(mascotaId); 
          } else {
            console.error(
              "Error al eliminar la mascota:",
              response.statusText
            );
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar la mascota.',
              'error'
            );
          }
        } catch (error) {
          console.error("Error al eliminar la mascota:", error);
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar la mascota.',
            'error'
          );
        }
      }
    } else {
      console.error("La mascotaId es undefined");
    }
  };

  return (
    <button onClick={handleDeleteClick} className="group">
      <svg
        className="rounded-full h-6 w-6 text-lime500 group-hover:bg-lime-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  );
};

export default DeleteMascota;
