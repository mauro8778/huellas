'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { IMascotas } from '@/interface/IMascotas';
import ModalFilterMascotas from '@/components/Card-Animals/FiltroMascotas/ModalFilterMascotas';
import useUserRole from '@/utils/userSession';
import withAuth from '@/HOC/withAuth';

const ListaMascotas = lazy(() => import('@/components/Card-Animals/ListaMascotas'));

const Adopta = () => {
  const [mascotasState, setMascotasState] = useState<IMascotas[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ edad: string; tamaño: string; sexo: string; especie: string }>({ edad: '', tamaño: '', sexo: '', especie: ''});
  const [filterOptions, setFilterOptions] = useState<{ edades: number[]; tamaños: string[]; sexos: string[], especies: string[] }>({ edades: [], tamaños: [], sexos:[], especies:[] });
  const userRole = useUserRole(); 

  useEffect(() => {
    const savedFilters = localStorage.getItem('mascotasFilters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }

    const fetchMascotas = async () => {
      try {
        const response = await fetch('https://huellasdesperanza.onrender.com/search/pets');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de las mascotas!');
        }
        const data: IMascotas[] = await response.json();
        setMascotasState(data);
        const edades = Array.from(new Set(data.map(mascota => mascota.age || 0)));
        const tamaños = Array.from(new Set(data.map(mascota => mascota.pet_size || '')));
        const sexos = Array.from(new Set(data.map(mascota => mascota.sexo || '')));
        const especies = Array.from(new Set(data.map(mascota => mascota.species || '')));
        setFilterOptions({ edades, tamaños, sexos, especies });
      } catch (error) {
        console.error(error);
      }
    };
    fetchMascotas();
  }, []);

  const handleFilter = (edad: string, tamaño: string, sexo: string, especie: string) => {
    console.log('Aplicando filtros:', { edad, tamaño, sexo, especie });
    const filters = { edad, tamaño, sexo, especie };
    setFilters(filters);
    localStorage.setItem('mascotasFilters', JSON.stringify(filters));
    setFilterModalVisible(false);
  };

  const filtrarMascotas = () => {
    return mascotasState.filter(mascota => {
      const edadCoincide = filters.edad ? (
        (filters.edad === 'cachorro' && mascota.month === 'meses') ||
        (filters.edad === 'adulto' && mascota.age && mascota.age >= 1 && mascota.age <= 5 && mascota.month === 'años') ||
        (filters.edad === 'senior' && mascota.age && mascota.age > 5 && mascota.month === 'años')
      ) : true;
      const tamañoCoincide = filters.tamaño ? mascota.pet_size === filters.tamaño : true;
      const sexoCoincide = filters.sexo ? mascota.sexo === filters.sexo : true;
      const especieCoincide = filters.especie ? mascota.species === filters.especie : true;
      return edadCoincide && tamañoCoincide && sexoCoincide && especieCoincide;
    });
  };

  const updateMascota = (updatedMascota: IMascotas) => {
    setMascotasState(prevState =>
      prevState.map(mascota =>
        mascota.id === updatedMascota.id ? updatedMascota : mascota
      )
    );
  };

  const deleteMascotaFromList = (mascotaId: string) => {
    setMascotasState(prevState => prevState.filter(m => m.id !== mascotaId));
  };

  const filteredMascotas = filtrarMascotas();

  return (
    <main className="flex flex-col items-center bg-gray-50">
      <div className="flex justify-center space-x-2">
        <button onClick={() => setFilterModalVisible(true)} className="mt-3 text-white bg-lime500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2">
          Filtrar Mascotas
        </button>
      </div>
      <Suspense fallback={<div>Cargando mascotas...</div>}>
        {filteredMascotas.length > 0 ? (
          <ListaMascotas 
            mascotas={filteredMascotas} 
            updateMascota={updateMascota}
            deleteMascota={deleteMascotaFromList}
          />
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
        sexos={filterOptions.sexos}
        especies={filterOptions.especies}
      />
    </main>
  );
};

export default withAuth(Adopta);




// 'use client';

// import React, { useState, useEffect, lazy, Suspense } from 'react';
// import { IMascotas } from '@/interface/IMascotas';
// import ModalFilterMascotas from '@/components/Card-Animals/FiltroMascotas/ModalFilterMascotas';
// import withAuth from '@/HOC/withAuth';

// const ListaMascotas = lazy(() => import('@/components/Card-Animals/ListaMascotas'));

// const Adopta = () => {
//   const [mascotasState, setMascotasState] = useState<IMascotas[]>([]);
//   const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
//   const [filters, setFilters] = useState<{ edad: string; tamaño: string; sexo: string; especie: string }>({ edad: '', tamaño: '', sexo: '', especie: ''});
//   const [filterOptions, setFilterOptions] = useState<{ edades: number[]; tamaños: string[]; sexos: string[], especies: string[] }>({ edades: [], tamaños: [], sexos:[], especies:[] });

//   useEffect(() => {
//     const savedFilters = localStorage.getItem('mascotasFilters');
//     if (savedFilters) {
//       setFilters(JSON.parse(savedFilters));
//     }

//     const fetchMascotas = async () => {
//       try {
//         const response = await fetch('https://huellasdesperanza.onrender.com/search/pets');
//         if (!response.ok) {
//           throw new Error('Error al obtener los datos de las mascotas!');
//         }
//         const data: IMascotas[] = await response.json();
//         setMascotasState(data);
//         const edades = Array.from(new Set(data.map(mascota => mascota.age || 0)));
//         const tamaños = Array.from(new Set(data.map(mascota => mascota.pet_size || '')));
//         const razas = Array.from(new Set(data.map(mascota => mascota.breed || '')));
//         const sexos = Array.from(new Set(data.map(mascota => mascota.sexo || '')));
//         const especies = Array.from(new Set(data.map(mascota => mascota.species || '')));
//         setFilterOptions({ edades, tamaños, sexos, especies });
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMascotas();
//   }, []);

//   const handleFilter = (edad: string, tamaño: string, sexo: string, especie: string) => {
//     console.log('Aplicando filtros:', { edad, tamaño, sexo, especie });
//     const filters = { edad, tamaño, sexo, especie };
//     setFilters(filters);
//     localStorage.setItem('mascotasFilters', JSON.stringify(filters));
//     setFilterModalVisible(false);
//   };

//   const filtrarMascotas = () => {
//     return mascotasState.filter(mascota => {
//       const edadCoincide = filters.edad ? (
//         (filters.edad === 'cachorro' && mascota.age && mascota.age <= 1) ||
//         (filters.edad === 'adulto' && mascota.age && mascota.age > 1 && mascota.age <= 5) ||
//         (filters.edad === 'senior' && mascota.age && mascota.age > 5)
//       ) : true;
//       const tamañoCoincide = filters.tamaño ? mascota.pet_size === filters.tamaño : true;
//       const sexoCoincide = filters.sexo ? mascota.sexo === filters.sexo : true;
//       const especieCoincide = filters.especie ? mascota.species === filters.especie : true;
//       return edadCoincide && tamañoCoincide && sexoCoincide && especieCoincide;
//     });
//   };

//   const updateMascota = (updatedMascota: IMascotas) => {
//     setMascotasState(prevState =>
//       prevState.map(mascota =>
//         mascota.id === updatedMascota.id ? updatedMascota : mascota
//       )
//     );
//   };

//   const deleteMascotaFromList = (mascotaId: string) => {
//     setMascotasState(prevState => prevState.filter(m => m.id !== mascotaId));
//   };

//   const filteredMascotas = filtrarMascotas();

//   return (
//     <main className="flex flex-col items-center bg-gray-300">
//       <div className="flex justify-center space-x-2">
//         <button onClick={() => setFilterModalVisible(true)} className="mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
//           Filtrar Mascotas
//         </button>
//       </div>
//       <Suspense fallback={<div>Cargando mascotas...</div>}>
//         {filteredMascotas.length > 0 ? (
//           <ListaMascotas 
//             mascotas={filteredMascotas} 
//             updateMascota={updateMascota}
//             deleteMascota={deleteMascotaFromList}
//           />
//         ) : (
//           <div>No se encontraron mascotas con los filtros seleccionados!</div>
//         )}
//       </Suspense>
//       <ModalFilterMascotas
//         isOpen={filterModalVisible}
//         onClose={() => setFilterModalVisible(false)}
//         onFilter={handleFilter}
//         edades={filterOptions.edades}
//         tamaños={filterOptions.tamaños}
//         sexos={filterOptions.sexos}
//         especies={filterOptions.especies}
//       />
//     </main>
//   );
// };

// export default withAuth(Adopta);




// // 'use client';


// // import React, { useState, useEffect, lazy, Suspense } from 'react';
// // import { IMascotas } from '@/interface/IMascotas';
// // import ModalFilterMascotas from '@/components/Card-Animals/FiltroMascotas/ModalFilterMascotas';
// // import withAuth from '@/HOC/withAuth';

// // const ListaMascotas = lazy(() => import('@/components/Card-Animals/ListaMascotas'));

// // const Adopta = () => {
// //   const [mascotasState, setMascotasState] = useState<IMascotas[]>([]);
// //   const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
// //   const [filters, setFilters] = useState<{ edad: string; tamaño: string; sexo: string; especie: string }>({ edad: '', tamaño: '', sexo: '', especie: ''});
// //   const [filterOptions, setFilterOptions] = useState<{ edades: number[]; tamaños: string[]; sexos: string[], especies: string[] }>({ edades: [], tamaños: [], sexos:[], especies:[] });

// //   useEffect(() => {
// //     const fetchMascotas = async () => {
// //       try {
// //         const response = await fetch('https://huellasdesperanza.onrender.com/search/pets');
// //         if (!response.ok) {
// //           throw new Error('Error al obtener los datos de las mascotas!');
// //         }
// //         const data: IMascotas[] = await response.json();
// //         setMascotasState(data);
// //         const edades = Array.from(new Set(data.map(mascota => mascota.age || 0)));
// //         const tamaños = Array.from(new Set(data.map(mascota => mascota.pet_size || '')));
// //         const razas = Array.from(new Set(data.map(mascota => mascota.breed || '')));
// //         const sexos = Array.from(new Set(data.map(mascota => mascota.sexo || '')));
// //         const especies = Array.from(new Set(data.map(mascota => mascota.species || '')));
// //         setFilterOptions({ edades, tamaños, sexos, especies });
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
// //     fetchMascotas();
// //   }, []);

// //   const handleFilter = (edad: string, tamaño: string, sexo: string, especie: string) => {
// //     console.log('Aplicando filtros:', { edad, tamaño, sexo, especie });
// //     setFilters({ edad, tamaño, sexo, especie });
// //     setFilterModalVisible(false);
// //   };

// //   const filtrarMascotas = () => {
// //     return mascotasState.filter(mascota => {
// //       const edadCoincide = filters.edad ? (
// //         (filters.edad === 'cachorro' && mascota.age && mascota.age <= 1) ||
// //         (filters.edad === 'adulto' && mascota.age && mascota.age > 1 && mascota.age <= 5) ||
// //         (filters.edad === 'senior' && mascota.age && mascota.age > 5)
// //       ) : true;
// //       const tamañoCoincide = filters.tamaño ? mascota.pet_size === filters.tamaño : true;
// //       const sexoCoincide = filters.sexo ? mascota.sexo === filters.sexo : true;
// //       const especieCoincide = filters.especie ? mascota.species === filters.especie : true;
// //       return edadCoincide && tamañoCoincide && sexoCoincide && especieCoincide;
// //     });
// //   };

// //   const updateMascota = (updatedMascota: IMascotas) => {
// //     setMascotasState(prevState =>
// //       prevState.map(mascota =>
// //         mascota.id === updatedMascota.id ? updatedMascota : mascota
// //       )
// //     );
// //   };

// //   const deleteMascotaFromList = (mascotaId: string) => {
// //     setMascotasState(prevState => prevState.filter(m => m.id !== mascotaId));
// //   };

// //   const filteredMascotas = filtrarMascotas();

// //   return (
// //     <main className="flex flex-col items-center bg-gray-300">
// //       <div className="flex justify-center space-x-2">
// //         <button onClick={() => setFilterModalVisible(true)} className="mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
// //           Filtrar Mascotas
// //         </button>
// //       </div>
// //       <Suspense fallback={<div>Cargando mascotas...</div>}>
// //         {filteredMascotas.length > 0 ? (
// //           <ListaMascotas 
// //             mascotas={filteredMascotas} 
// //             updateMascota={updateMascota}
// //             deleteMascota={deleteMascotaFromList}
// //           />
// //         ) : (
// //           <div>No se encontraron mascotas con los filtros seleccionados!</div>
// //         )}
// //       </Suspense>
// //       <ModalFilterMascotas
// //         isOpen={filterModalVisible}
// //         onClose={() => setFilterModalVisible(false)}
// //         onFilter={handleFilter}
// //         edades={filterOptions.edades}
// //         tamaños={filterOptions.tamaños}
// //         sexos={filterOptions.sexos}
// //         especies={filterOptions.especies}
// //       />
// //     </main>
// //   );
// // };

// // export default withAuth(Adopta);
