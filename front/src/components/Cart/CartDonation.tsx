// /* eslint-disable @next/next/no-img-element */
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MdDeleteSweep } from 'react-icons/md';

// interface IShelter {
//   id: number;
//   name: string;
//   image: string;
//   amount: number;
// }

// const DonationForm: React.FC = () => {
//   const [shelters, setShelters] = useState<IShelter[]>([]);
//   const [total, setTotal] = useState(0);

//   // useEffect para cargar los refugios desde la API al montar el componente
//   useEffect(() => {
//     const fetchShelters = async () => {
//       try {
//         const response = await axios.get('');
//         setShelters(response.data);
//         setTotal(response.data.reduce((acc: number, shelter: IShelter) => acc + shelter.amount, 0));
//       } catch (error) {
//         console.error('Error fetching shelters:', error);
//       }
//       // const dummyData: IShelter[] = [
//       //   { id: 1, name: 'Refugio 1', image: 'https://via.placeholder.com/150', amount: 500 },
//       //   { id: 2, name: 'Refugio 2', image: 'https://via.placeholder.com/150', amount: 1000 },
//       //   { id: 3, name: 'Refugio 2', image: 'https://via.placeholder.com/150', amount: 1000 },
//       //   { id: 4, name: 'Refugio 2', image: 'https://via.placeholder.com/150', amount: 1000 },
//       //   { id: 5, name: 'Refugio 2', image: 'https://via.placeholder.com/150', amount: 1000 },
//       //   { id: 6, name: 'Refugio 2', image: 'https://via.placeholder.com/150', amount: 1000 },
//       //   { id: 6, name: 'Refugio 2', image: 'https://via.placeholder.com/150', amount: 1000 },
//       //   { id: 6, name: 'Refugio 2', image: 'https://via.placeholder.com/150', amount: 1000 },
//       // ];
  
//       // setShelters(dummyData);
//       // setTotal(dummyData.reduce((acc, shelter) => acc + shelter.amount, 0));
//     };

//     fetchShelters();
//   }, []);

//   // Función para eliminar un refugio de la lista
//   const handleRemoveShelter = (id: number) => {
//     const updatedShelters = shelters.filter(shelter => shelter.id !== id);
//     setShelters(updatedShelters);
//     setTotal(updatedShelters.reduce((acc, shelter) => acc + shelter.amount, 0));
//   };

//   // Función para manejar el proceso de pago
//   const handleCheckout = async () => {
//     try {
//       const response = await axios.post('/api/create_preference', { shelters });
//       const data = response.data;
//       if (data.id) {
//         window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
//       } else {
//         alert('Error al crear la preferencia de pago');
//       }
//     } catch (error) {
//       console.error('Error creating payment preference:', error);
//       alert('Error al crear la preferencia de pago');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="w-full max-w-4xl p-4  border-t-indigo500  border-t-5 shadow-xl bg-gray-50 rounded-xl ">
//         <h2 className="text-2xl font-bold border-b-2 mb-4 text-gray-700">Carrito de Donaciones</h2>
//         {shelters.length === 0 ? (
//           <p className="text-lg mb-4 font-semibold text-center">No hay refugios seleccionados</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {shelters.map(shelter => (
//               <div key={shelter.id} className="flex items-center justify-between p-4 border-t-lime500 border-t-3 rounded-lg shadow">
//                 <div className="flex items-center">
//                   <img src={shelter.image} alt={shelter.name} className="w-16 h-16 mr-4 rounded-full  " />
//                   <div>
//                     <h3 className="text-lg font-bold">{shelter.name}</h3>
//                     <p className="text-sm">${shelter.amount}</p>
//                   </div>
//                 </div>
//                 <button 
//                   className="text-salmon500 hover:text-red-800 text-sm px-5 py-2.5"
//                   onClick={() => handleRemoveShelter(shelter.id)}
//                 >
//                   <MdDeleteSweep className='text-2xl' />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="w-64  ml-4 p-4 border-t-lime500 border-t-5 rounded-xl shadow-xl bg-white">
//         {shelters.length > 0 && (
//           <>
//             <h3 className="text-lg font-bold mb-4 border-b-2 text-gray-700">Resumen de Donaciones</h3>
//             <p className="text-lg mb-4">Total: ${total}</p>
//             <button 
//               onClick={handleCheckout} 
//               className="w-full bg-lime500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-xl"
//             >
//               Donar
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DonationForm;

/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteSweep } from 'react-icons/md';
import Image from 'next/image';

interface IShelter {
  id: number;
  name: string;
  image: string;
  amount: number;
}

const DonationForm: React.FC = () => {
  const [shelters, setShelters] = useState<IShelter[]>([]);
  const [total, setTotal] = useState(0);

  // useEffect para cargar los refugios desde la API al montar el componente
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get('');
        setShelters(response.data);
        setTotal(response.data.reduce((acc: number, shelter: IShelter) => acc + shelter.amount, 0));
      } catch (error) {
        console.error('Error fetching shelters:', error);
      }
    };

    fetchShelters();
  }, []);

  // Función para eliminar un refugio de la lista
  const handleRemoveShelter = (id: number) => {
    const updatedShelters = shelters.filter(shelter => shelter.id !== id);
    setShelters(updatedShelters);
    setTotal(updatedShelters.reduce((acc, shelter) => acc + shelter.amount, 0));
  };

  // Función para manejar el proceso de pago
  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/create_preference', { shelters });
      const data = response.data;
      if (data.id) {
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        alert('Error al crear la preferencia de pago');
      }
    } catch (error) {
      console.error('Error creating payment preference:', error);
      alert('Error al crear la preferencia de pago');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-4xl p-4 border-t-indigo500 border-t-5 shadow-xl bg-gray-50 rounded-xl">
        <h2 className="text-2xl font-bold border-b-2 mb-4 text-gray-700">Carrito de Donaciones</h2>
        {shelters.length === 0 ? (
          <p className="text-lg mb-4 font-semibold text-center">No hay refugios seleccionados</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shelters.map(shelter => (
              <div key={shelter.id} className="flex items-center justify-between p-4 border-t-lime500 border-t-3 rounded-lg shadow">
                <div className="flex items-center">
                  <Image src={shelter.image} alt={shelter.name} width={64} height={64} className="w-16 h-16 mr-4 rounded-full" />
                  <div>
                    <h3 className="text-lg font-bold">{shelter.name}</h3>
                    <p className="text-sm">${shelter.amount}</p>
                  </div>
                </div>
                <button
                  className="text-salmon500 hover:text-red-800 text-sm px-5 py-2.5"
                  onClick={() => handleRemoveShelter(shelter.id)}
                >
                  <MdDeleteSweep className='text-2xl' />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-64 ml-4 p-4 border-t-lime500 border-t-5 rounded-xl shadow-xl bg-white">
        {shelters.length > 0 && (
          <>
            <h3 className="text-lg font-bold mb-4 border-b-2 text-gray-700">Resumen de Donaciones</h3>
            <p className="text-lg mb-4">Total: ${total}</p>
            <button
              onClick={handleCheckout}
              className="w-full bg-lime500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-xl"
            >
              Donar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DonationForm;

