'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPaw } from 'react-icons/fa';
import FavoriteRefuge from './FavoriteRefuge';
import Swal from 'sweetalert2';
import { IDonation } from '@/types';
import { IRefugios } from '@/interface/IRefugios';
import Image from 'next/image';

export const RefugioDetail: React.FC<IRefugios> = ({ id, name, description, imgUrl, location, zona, shelter_name, phone }) => {
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    console.log('Componente montado, leyendo donaciones desde el almacenamiento local');
    const savedDonations = localStorage.getItem('donations');
    if (savedDonations) {
      console.log('Donaciones guardadas encontradas:', savedDonations);
      setDonations(JSON.parse(savedDonations)); // Establecer las donaciones desde el almacenamiento local
    }

    const userSession = localStorage.getItem('userSession');
    const accessToken = userSession ? JSON.parse(userSession).access_token : null;

    if (!accessToken) {
      Swal.fire('No estás autenticado. Por favor, inicia sesión para continuar.');
      return;
    }

    setToken(accessToken);
  }, []);

  useEffect(() => {
    console.log('Donations updated, saving to localStorage:', donations);
    localStorage.setItem('donations', JSON.stringify(donations));
  }, [donations]);

  const handleToggleFavorite = () => {
    console.log('Favorito cambiado:', !isFavorite);
    setIsFavorite(!isFavorite);
  };

  const handleSelectAmount = (amount: number) => {
    console.log('Monto seleccionado:', amount);
    setSelectedAmount(selectedAmount === amount ? null : amount);
  };

  const handleAddToCart = async () => {
    if (selectedAmount === null) {
      Swal.fire('Por favor, selecciona un monto para donar');
      return;
    }

    console.log('Monto para donar:', selectedAmount);

    const newDonation: IDonation = {
      shelter: {
        id: id ?? '',
        name: shelter_name ?? 'Nombre del refugio desconocido'
      },
      amount: selectedAmount
    };

    if (!token) {
      Swal.fire('No estás autenticado. Por favor, inicia sesión para continuar.');
      return;
    }

    try {
      console.log('Enviando solicitud POST al servidor...');
      const response = await fetch("https://huellasdesperanza.onrender.com/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify([newDonation])
      });
      console.log('Respuesta del servidor:', response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar donación al carrito: ${errorText}`);
      }

      setDonations(prevDonations => {
        const updatedDonations = [...prevDonations, newDonation];
        console.log('Updating localStorage with new donations:', updatedDonations);
        localStorage.setItem('donations', JSON.stringify(updatedDonations));
        return updatedDonations;
      });

      Swal.fire(`Tu donación de $${selectedAmount} fue agregada con éxito`);

      router.push('/refugios'); // Comentado para evitar la redirección por el momento
    } catch (error) {
      console.error('Error al agregar donación al carrito:', error);
      let errorMessage = 'Hubo un error al agregar la donación al carrito. Por favor, inténtalo nuevamente.';

      if (error instanceof Error) {
        errorMessage = `Hubo un error al agregar la donación al carrito: ${error.message}`;
      }

      Swal.fire({
        title: "¡Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 2000,
        customClass: {
          popup: 'max-w-md w-full p-4 bg-white rounded-lg shadow-lg',
          title: 'text-xl font-bold text-gray-700',
          confirmButton: 'bg-green-500 text-white rounded px-4 py-2 mt-2'
        }
      });
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-5 mb-5 bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={imgUrl ?? ''}
              alt={name ?? ''}
              width={500}
              height={300}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="md:w-1/2 p-5 flex flex-col items-center justify-center text-center relative">
            <div className="absolute top-2 right-2">
              {id && <FavoriteRefuge isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} isLoggedIn id={id} />}
            </div>
            <h1 className='antialiased font-bold text-xl mb-3'>
              {shelter_name}
            </h1>
            <h2 className="text-sm mb-1">Estamos en {zona}</h2>
            <h2 className="text-sm mb-1">Ubicados en {location}</h2>
            <h2 className="text-sm mt-5">Contacto: {name} - {phone}</h2>
            <h3 className="font-bold text-sm mt-5">Descripción:</h3>
            <p className="font-light">{description}</p>
          </div>
        </div>
      </div>
      <div className="donation-section max-w-3xl mx-auto mt-5 p-5 bg-white shadow-xl rounded-lg">
        <h2 className="text-lg font-bold mb-3 text-center">Doná al refugio y deja tu huella</h2>
        <div className="donation-amounts flex justify-around mt-3">
          <div
            onClick={() => handleSelectAmount(500)}
            className={`cursor-pointer border-2 border-blue-500 rounded-lg p-4 text-center bg-blue-100 transition-transform transform active:bg-blue-200 active:scale-95 ${selectedAmount === 500 && 'bg-blue-300'} w-32 h-48 flex flex-col justify-center items-center`}
          >
            <p className="text-lg font-bold">Donar</p>
            <p className="text-2xl font-bold">$500</p>
            <p className="text-xs font-bold">ARG</p>
            <hr className="my-2" />
            <FaPaw className="text-primary mx-auto" size={24} />
          </div>
          <div
            onClick={() => handleSelectAmount(1000)}
            className={`cursor-pointer border-2 border-blue-500 rounded-lg p-4 text-center bg-blue-100 transition-transform transform active:bg-blue-200 active:scale-95 ${selectedAmount === 1000 && 'bg-blue-300'} w-32 h-48 flex flex-col justify-center items-center`}
          >
            <p className="text-lg font-bold">Donar</p>
            <p className="text-2xl font-bold">$1000</p>
            <p className="text-xs font-bold">ARG</p>
            <hr className="my-2" />
            <FaPaw className="text-primary mx-auto" size={24} />
          </div>
          <div
            onClick={() => handleSelectAmount(5000)}
            className={`cursor-pointer border-2 border-blue-500 rounded-lg p-4 text-center bg-blue-100 transition-transform transform active:bg-blue-200 active:scale-95 ${selectedAmount === 5000 && 'bg-blue-300'} w-32 h-48 flex flex-col justify-center items-center`}
          >
            <p className="text-lg font-bold">Donar</p>
            <p className="text-2xl font-bold">$5000</p>
            <p className="text-xs font-bold">ARG</p>
            <hr className="my-2" />
            <FaPaw className="text-primary mx-auto" size={24} />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </>
  );
};

export default RefugioDetail;