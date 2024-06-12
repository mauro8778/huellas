'use client';

import React, { Suspense, useEffect, useState } from 'react';
import ListaRefugios from '@/components/Refugios/ListaRefugios';
import { IRefugios } from '@/interface/IRefugios';
import ModalFilter from '@/components/Refugios/FiltroRefugio/ModalFilterRefugios';
import { IMascotas } from '@/interface/IMascotas';
import ModalFormularioMascota from '@/components/Refugios/AñadirMascota/ModalPostMascotas';

const Page = () => {
  const [refugios, setRefugios] = useState<IRefugios[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [addMascotaModalVisible, setAddMascotaModalVisible] = useState(false);
  const [filtroUbicacion, setFiltroUbicacion] = useState('');
  const [filtroZona, setFiltroZona] = useState('');
  const [ubicacionesDisponibles, setUbicacionesDisponibles] = useState<string[]>([]);
  const [zonasDisponibles, setZonasDisponibles] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://huellasdesperanza.onrender.com/shelters')
      .then(response => response.json())
      .then((data: IRefugios[]) => {
        setRefugios(data);
        const ubicaciones = Array.from(new Set(data.map(refugio => refugio.location)));
        const zonas = Array.from(new Set(data.map(refugio => refugio.zona)));
        setUbicacionesDisponibles(ubicaciones);
        setZonasDisponibles(zonas);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  const handleOpenFilterModal = () => {
    setFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalVisible(false);
  };

  const handleFilter = (ubicacion: string, zona: string) => {
    setFiltroUbicacion(ubicacion);
    setFiltroZona(zona);
    setFilterModalVisible(false);
  };

  const handleOpenAddMascotaModal = () => {
    setAddMascotaModalVisible(true);
  };

  const handleCloseAddMascotaModal = () => {
    setAddMascotaModalVisible(false);
  };

  const handleAddMascota = (mascota: IMascotas) => {
  };

  const filtrarRefugios = () => {
    return refugios.filter(refugio => {
      const ubicacionCoincide = filtroUbicacion ? refugio.location.toLowerCase().includes(filtroUbicacion.toLowerCase()) : true;
      const zonaCoincide = filtroZona ? refugio.zona.toLowerCase().includes(filtroZona.toLowerCase()) : true;
      return ubicacionCoincide && zonaCoincide;
    });
  };
  const filteredRefugios = filtrarRefugios();


  return (
    <main className='bg-gray-300 flex flex-col items-center'>
      <div className="flex justify-center space-x-2">
        <button onClick={handleOpenFilterModal} className="mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Filtrar Refugios
        </button>
        <button onClick={handleOpenAddMascotaModal} className="mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Añadir Mascota
        </button>
      </div>

      <Suspense fallback={<div>Cargando mascotas...</div>}>
        {filteredRefugios.length > 0 ? (
      <ListaRefugios refugios={filtrarRefugios()} />
    ) : (
          <div>No se encontraron mascotas con los filtros seleccionados</div>
        )}
      </Suspense>


      <ModalFilter
        isOpen={filterModalVisible}
        onClose={handleCloseFilterModal}
        onFilter={handleFilter}
        ubicaciones={ubicacionesDisponibles}
        zonas={zonasDisponibles}
      />

      <ModalFormularioMascota
        isOpen={addMascotaModalVisible}
        onClose={handleCloseAddMascotaModal}
        onAddMascota={handleAddMascota}
      />
      
    </main>
  );
};

export default Page;
