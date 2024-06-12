const DeleteMascota: React.FC<{ mascotaId?: string, onDelete: (mascotaId: string) => void }> = ({ mascotaId, onDelete }) => {
    const handleDeleteClick = async () => {
      if (mascotaId) { 
        if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
          try {
            const response = await fetch(
              `https://huellasdesperanza.onrender.com/pets/delete/${mascotaId}`,
              {
                method: "POST",
              }
            );
  
            if (response.ok) {
              console.log("Mascota eliminada exitosamente");
              alert("Mascota eliminada exitosamente");
              onDelete(mascotaId); 
            } else {
              console.error(
                "Error al eliminar la mascota:",
                response.statusText
              );
            }
          } catch (error) {
            console.error("Error al eliminar la mascota:", error);
          }
        }
      } else {
        console.error("La mascotaId es undefined");
      }
    };
  
    return (
          <button onClick={handleDeleteClick} className="group">
            <svg
              className="rounded-full h-6 w-6 text-gray-500 group-hover:bg-gray-400"
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
  