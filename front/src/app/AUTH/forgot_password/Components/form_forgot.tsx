'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

const Form_forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleBack = () => {
    router.push('/AUTH/forgot_password')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://huellasdesperanza.onrender.com/auth/email', { email });

      localStorage.setItem('userId', response.data);

      Swal.fire('¡Solicitud de cambio contraseña enviada!', 'Revisa tu correo electrónico para más instrucciones.', 'success');
    } catch (error) {
      console.error('Error al solicitar el restablecimiento de contraseña:', error);
      Swal.fire('¡Error', 'Por favor, intenta nuevamente.', 'error');
    }
  };

  return (
    <div className='w-full max-w-md'>
      <div className='mb-5'>
        <h2 className='text-2xl font-semibold'>¿Olvidaste tu contraseña?</h2>
        <p className='text-yellow500 text-sm mt-2'>
          Por favor, ingresa tu correo electrónico para restablecer la contraseña.
        </p>
      </div>
      <form className='w-full' onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='Correo electrónico'
          value={email}
          onChange={handleChange}
        />
        <Button type='submit' label='Cambiar contraseña' />
        <div className='mt-5 mb-5 flex items-center justify-center gap-x-2'>
          <p className='text-yellow500'>¿Tienes una cuenta?</p>
          <button
            type='button'
            onClick={() => router.push('/AUTH/login')}
            className='font-semibold hover:text-primary transition-colors duration-300'
          >
            Iniciar sesión
          </button>
        </div>
        <div className='flex items-center justify-center gap-x-2 '>
          <p className='text-yellow500'>¿No tienes una cuenta?</p>
          <button
            type='button'
            onClick={() => router.push('/AUTH/login')}
            className='font-semibold transition-colors duration-300'
          >
            Regístrate
          </button>
        
        </div>
        <div className='flex justify-center mt-2'>
            <Link href={'/AUTH/login'}>
             <BackButton />
            </Link>
       
        </div>
      </form>
    </div>
  );
};

export default Form_forgot;
