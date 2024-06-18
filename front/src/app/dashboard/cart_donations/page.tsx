'use client';
import { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { MdDeleteSweep } from "react-icons/md";
import axios from 'axios';
import Image from 'next/image';
import { IDonation } from '@/types';

const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/150';

const DonationsUI: React.FC = () => {
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [totalDonations, setTotalDonations] = useState<number>(0);

  useEffect(() => {
    const savedDonations = localStorage.getItem('donations');
    if (savedDonations) {
      const parsedDonations = JSON.parse(savedDonations);
      setDonations(parsedDonations);
      setTotalDonations(parsedDonations.reduce((acc: number, donation: IDonation) => acc + donation.amount, 0));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('donations', JSON.stringify(donations));
    setTotalDonations(donations.reduce((acc, donation) => acc + donation.amount, 0));
  }, [donations]);

  initMercadoPago('TEST-5423250e-6e54-4e3b-a21b-160a1653fc7a'); // Init MercadoPago

  const handleRemoveDonation = (index: number) => {
    const updatedDonations = [...donations];
    updatedDonations.splice(index, 1);
    setDonations(updatedDonations);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('https://huellasdesperanza.onrender.com/mercado-pago', {
        title: 'Donaciones a refugios',
        price: totalDonations,
      });

      const { id } = response.data;
      return id;
    } catch (error: any) {
      console.error('Error al crear preference de Mercado Pago!', error.response ? error.response.data : error.message);
    }
  };

  const handleBuy = async () => {
    const preferenceId = await handleCheckout();
    if (preferenceId) {
      setPreferenceId(preferenceId);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="donations-list w-96 p-4 border rounded shadow-lg">
        <h2 className="text-lg font-bold border-b-2 mb-4 text-gray-500">My Donations</h2>
        {donations.length === 0 ? (
          <p className="text-base mb-4 font-semibold ml-14">No donations yet</p>
        ) : (
          <ul>
            {donations.map((donation: IDonation, index: number) => (
              <li key={index} className="donation-item flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image src={DEFAULT_IMAGE_URL} alt="Refugio" className="w-16 h-16 mr-4" width={100} height={100} />
                  <div>
                    <h3 className="text-base font-bold">{donation.shelter.name}</h3>
                    <p className="text-sm">${donation.amount}</p>
                  </div>
                </div>
                <div
                  className="remove-donation text-red-600 hover:text-red-800 text-sm px-5 py-2.5"
                  onClick={() => handleRemoveDonation(index)}
                >
                  <MdDeleteSweep className='text-2xl mb-3' />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="total-card w-64 ml-4 p-4 border rounded shadow-lg">
        {donations.length > 0 ? (
          <>
            <h3 className="text-lg font-bold mb-4 border-b-2 text-gray-500">Summary</h3>
            <p className="text-base mb-4">Total: ${totalDonations}</p>
            <button
              onClick={handleBuy}
              className="checkout-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Dona y deja tu Huella
            </button>
            {preferenceId && (
              <div className="mt-4">
                <Wallet
                  initialization={{ preferenceId }}
                  customization={{ texts: { valueProp: 'smart_option' } }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-4 border-b-2 text-gray-500">Summary</h3>
            <h1 className='text-base font-semibold text-gray-900'>Total: ${totalDonations}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default DonationsUI;
