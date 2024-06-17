'use client';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { IMascotas } from '@/interface/IMascotas';
import ModalFilterMascotas from '@/components/Card-Animals/FiltroMascotas/ModalFilterMascotas';
import withAuth from '@/HOC/withAuth';

const ListaMascotas = lazy(() => import('@/components/Card-Animals/ListaMascotas'));

const Adopta = () => {
  const [mascotasState, setMascotasState] = useState<IMascotas[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ edad: string; tamaño: string; raza: string, sexo: string, especie: string }>({ edad: '', tamaño: '', raza: '', sexo: '', especie: ''});
  const [filterOptions, setFilterOptions] = useState<{ edades: number[]; tamaños: string[]; razas: string[]; sexos: string[], especies: string[] }>({ edades: [], tamaños: [], razas: [], sexos:[], especies:[] });

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const queryParams = new URLSearchParams();
        const response = await fetch(`https://huellasdesperanza.onrender.com/search/pets?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos de las mascotas!');
        }
        const data: IMascotas[] = await response.json();
        setMascotasState(data);
        const edades = Array.from(new Set(data.map(mascota => mascota.age || 0)));
        const tamaños = Array.from(new Set(data.map(mascota => mascota.pet_size || '')));
        const razas = Array.from(new Set(data.map(mascota => mascota.breed || '')));
        const sexos = Array.from(new Set(data.map(mascota => mascota.sexo || '')));
        const especies = Array.from(new Set(data.map(mascota => mascota.species || '')));
        setFilterOptions({ edades, tamaños, razas, sexos, especies });
      } catch (error) {
        console.error(error);
      }
    };
    fetchMascotas();
  }, []);

  const handleFilter = (edad: string, tamaño: string, raza: string, sexo: string, especie: string) => {
    setFilters({ edad, tamaño, raza, sexo, especie });
    setFilterModalVisible(false);
  };

  const filtrarMascotas = () => {
    return mascotasState.filter(mascota => {
      const edadCoincide = filters.edad ? mascota.age === Number(filters.edad) : true;
      const tamañoCoincide = filters.tamaño ? mascota.pet_size === filters.tamaño : true;
      const razaCoincide = filters.raza ? mascota.breed === filters.raza : true;
      const sexoCoincide = filters.sexo ? mascota.sexo === filters.sexo : true;
      const especieCoincide = filters.especie ? mascota.species === filters.especie : true;
      return edadCoincide && tamañoCoincide && razaCoincide && sexoCoincide && especieCoincide;
    });
  };

  const updateMascota = (updatedMascota: IMascotas) => {
    setMascotasState(prevState =>
      prevState.map(mascota =>
        mascota.id === updatedMascota.id ? updatedMascota : mascota
      )
    );
  };

  const filteredMascotas = filtrarMascotas();

  return (
    <main className="flex flex-col items-center bg-gray-300">
      <div className="flex justify-center space-x-2">
        <button onClick={() => setFilterModalVisible(true)} className="mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Filtrar Mascotas
        </button>
      </div>
      <Suspense fallback={<div>Cargando mascotas...</div>}>
        {filteredMascotas.length > 0 ? (
          <ListaMascotas mascotas={filteredMascotas} updateMascota={updateMascota} />
        ) : (
          <div>No se encontraron mascotas con los filtros seleccionados!</div>
        )}
      </Suspense>
      <ModalFilterMascotas
        isOpen={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onFilter={handleFilter}
        edades={filterOptions.edades}
        tamaños={filterOptions.tamaños}
        razas={filterOptions.razas}
        sexos={filterOptions.sexos}
        especies={filterOptions.especies}
      />
    </main>
  );
};

export default withAuth(Adopta);


