'use client';

import { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

interface FormLoginProps {
  children?: ReactNode;
}

const FormularioAdoption: React.FC<FormLoginProps> = () => {
  return (
    <div className='w-full max-w-md'>
      <div className='mb-5'>
        <h2 className='text-2xl font-semibold'>Hola!</h2>
        <p className='text-gray-500 text-sm'>
          Por favor completa el formulario, si no leiste aún los requisitos presiona <button
            type='button'
            className='font-semibold hover:text-pink-600 transition-colors duration-300'>
            aquí.
          </button>
        </p>
      </div>
      <form className='w-full'>
        <Input type='text' name='nombreCompleto' placeholder='Nombre Completo' />
        <Input type='text' name='email' placeholder='Email' />
        <Input type='text' name='telefono' placeholder='Teléfono' />
        <Input type='text' name='motivo' placeholder='¿Por qué querés adoptar?' />
        <div className='flex justify-end mb-5'>
          <button
            type='button'
            className='text-gray-500 hover:text-pink-600 transition-colors duration-300'
          >
            Adoptá con conciencia y corazón.
          </button>
        </div>
        <Button type='submit' label='Postular' />
        <div className='mt-5 mb-10 flex items-center justify-center gap-x-2'>
          <p className='text-gray-500'>¿No leíste los requisitos para la adopción?</p>
          <button
            type='button'
            className='font-semibold hover:text-pink-600 transition-colors duration-300'
          >
            Leer
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioAdoption;