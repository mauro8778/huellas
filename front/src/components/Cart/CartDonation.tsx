'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteSweep } from 'react-icons/md';
import Image from 'next/image';
import Swal from 'sweetalert2';

interface IShelter {
  id: number;
  shelter_name: string;
  imgUrl: string;
  price: number;
}

const DonationForm: React.FC = () => {
  const [shelters, setShelters] = useState<IShelter[]>([]);
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    const accessToken = userSession ? JSON.parse(userSession).access_token : null;

    if (!accessToken) {
      Swal.fire('No estás autenticado. Por favor, inicia sesión para continuar.');
      return;
    }

    setToken(accessToken);
  }, []);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        if (!token) {
          console.error('Token no disponible');
          return;
        }

        const response = await fetch('https://huellasdesperanza.onrender.com/carrito', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los refugios');
        }

        const data = await response.json();
        let total = 0;
        for (let i = 0; i < data.length; i++) {
          total += Number(data[i].price);
        }

        setShelters(data);
        setTotal(Number(total));
      } catch (error) {
        console.error('Error al obtener los refugios:', error);
        setShelters([]); // En caso de error, asegurarse de que shelters sea un array vacío
      }
    };

    if (token) {
      fetchShelters();
    }
  }, [token]);

  const handleRemoveShelter = async (id: number) => {
    try {
      const response = await fetch(`https://huellasdesperanza.onrender.com/carrito/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el refugio');
      }

      const updatedShelters = shelters.filter(shelter => shelter.id !== id);
      setShelters(updatedShelters);

      let newTotal = 0;
      updatedShelters.forEach(shelter => {
        newTotal += Number(shelter.price);
      });
      setTotal(newTotal);
    } catch (error) {
      console.error('Error al eliminar el refugio:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('https://huellasdesperanza.onrender.com/mercado-pago', {
        title: 'Monto total de la Donacion',
        price: Number(total),
      });
      const data = response.data;

      if (data) {
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.async = true;
        script.onload = () => {
          const mp = new window.MercadoPago('TEST-5423250e-6e54-4e3b-a21b-160a1653fc7a', {
            locale: 'es-AR',
          });
          mp.checkout({
            preference: {
              id: data
            },
            autoOpen: true,
          });
        };
        document.body.appendChild(script);
      } else {
        alert('Error al crear la preferencia de pago');
      }

    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
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
                  <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={shelter.imgUrl}
                      alt={shelter.shelter_name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{shelter.shelter_name}</h3>
                    <p className="text-sm">${shelter.price}</p>
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
            <p className="text-lg mb-4">Total: ${Number(total)}</p>
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
