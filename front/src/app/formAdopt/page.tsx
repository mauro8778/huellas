'use client';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';  
import { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

const FormAdopt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('petId'); 
  
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    telefono: '',
    motivo: '',
  });

  useEffect(() => {
    if (id) {
      console.log('Pet ID:', id);

      const userSession = localStorage.getItem('userSession');
      const accessToken = userSession ? JSON.parse(userSession).access_token : null;

      console.log('Access Token:', accessToken);
    }
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userSession = localStorage.getItem('userSession');
    const accessToken = userSession ? JSON.parse(userSession).access_token : null;

    if (!accessToken) {
      alert('Usuario no está logueado');
      return;
    }

    if (!id) {
      alert('Falta el ID de la mascota');
      return;
    }

    const payload = {
      ...formData,
      id,
      token: accessToken,
    };

    console.log('Enviando payload:', payload);

    try {
      const response = await fetch(`https://huellasdesperanza.onrender.com/adoption/new/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el formulario');
      }

      const result = await response.json();
      console.log('Formulario enviado correctamente', result);
      alert('Formulario enviado correctamente, revise su mail para máss detalles');

      setFormData({
        nombreCompleto: '',
        email: '',
        telefono: '',
        motivo: '',
      });

      router.push('/adopta');
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      if (error instanceof Error) {
        alert(`Error al enviar el formulario: ${error.message}`);
      } else {
        alert('Ocurrió un error desconocido');
      }
    }
  };

  if (!id) {
    return <div>Cargando...</div>;
  }

  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <Logo />
      <div className='w-full max-w-md'>
        <div className='mb-5'>
          <h2 className='text-2xl font-semibold'>Hola!</h2>
          <p className='text-gray-500 text-sm'>
            Por favor completa el formulario, si no leíste aún los requisitos presiona <button
              type='button'
              className='font-semibold hover:text-pink-600 transition-colors duration-300'>
              aquí.
            </button>
          </p>
        </div>
        <form className='w-full' onSubmit={handleSubmit}>
          <Input type='text' name='nombreCompleto' placeholder='Nombre Completo' value={formData.nombreCompleto} onChange={handleChange} />
          <Input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
          <Input type='text' name='telefono' placeholder='Teléfono' value={formData.telefono} onChange={handleChange} />
          <Input type='text' name='motivo' placeholder='¿Por qué querés adoptar?' value={formData.motivo} onChange={handleChange} />
          <div className='flex justify-end mb-5'>
            <button
              type='button'
              className='text-gray-500 hover:text-pink-600 transition-colors duration-300'>
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
    </section>
  );
};

const WrappedFormAdopt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormAdopt />
    </Suspense>
  );
};

export default WrappedFormAdopt;