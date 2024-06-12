/* eslint-disable @next/next/no-sync-scripts */
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    MercadoPago: any; // Define MercadoPago como cualquier tipo 
  }
}

export const Checkout = () => {
  const searchParams = useSearchParams();
  const preferenceId = searchParams.get('preferenceId');

  useEffect(() => {
    if (preferenceId) {
      const mp = new window.MercadoPago('TEST-5423250e-6e54-4e3b-a21b-160a1653fc7a', {
        locale: 'es-AR'
      });

      mp.checkout({
        preference: {
          id: preferenceId
        },
        render: {
          container: '#cho-container', 
          label: 'Pagar',
        }
      });
    }
  }, [preferenceId]);

  return (
    <div>
      <h1 className='text-lg font-bold text-center'>Pagar Donación</h1>
      <div id="cho-container" className='flex justify-center mt-5'></div>
      <script src="https://sdk.mercadopago.com/js/v2"></script>
    </div>
  );
};

export default Checkout;
