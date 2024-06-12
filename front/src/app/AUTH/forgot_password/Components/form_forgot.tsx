'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useRouter } from 'next/navigation';



const Form_forgot = () => {
  const router = useRouter();

  return (
    <div className='w-full max-w-md'>
      <div className='mb-5'>
        <h2 className='text-2xl font-semibold'>Olvidaste tu contraseña?</h2>
        <p className='text-gray-500 text-sm'>
          Porfavor ingresa tu correo electronico para restablecer la contraseña
          
        </p>
      </div>
      <form className='w-full'>
        <Input type='text' placeholder='Email' />
        <Button type='submit' label='Send instructions' />
        <div className='mt-5 mb-5 flex items-center justify-center gap-x-2'>
          <p className='text-gray-500'>Tenes una cuenta?</p>
          <button
            type='button'
            onClick={() => router.push('/AUTH/login')}
            className='font-semibold hover:text-primary transition-colors duration-300'
          >
            Login
          </button>
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          <p className='text-gray-500'>No tenes una cuenta?</p>
          <button
            type='button'
            onClick={() => router.push('/option_register')}
            className='font-semibold hover:text-pink-600 transition-colors duration-300'
          >
            Registrate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form_forgot;
