'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';
import BackButton from '@/components/ui/BackButton';
import Link from 'next/link';

const NewPassword: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [formValidations, setFormValidations] = useState({
    newPasswordValid: null as boolean | null,
    confirmPasswordValid: null as boolean | null
  });

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'newPassword') {
      setFormValidations(prev => ({
        ...prev,
        newPasswordValid: validatePassword(value),
        confirmPasswordValid: value === formData.confirmPassword
      }));
    }

    if (name === 'confirmPassword') {
      setFormValidations(prev => ({
        ...prev,
        confirmPasswordValid: value === formData.newPassword
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValidations.newPasswordValid && formValidations.confirmPasswordValid) {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.put('https://huellasdesperanza.onrender.com/auth/password', {  
          userId: userId,
          newPassword: formData.newPassword,
        });
        Swal.fire({text:'¡Cambio de contraseña exitoso!', icon:'success' });
        localStorage.removeItem('userId');
        router.push('/AUTH/login');
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        Swal.fire('¡Error al cambiar la contraseña!');
      }
    } else {
      console.log('Las contraseñas son inválidas');
      Swal.fire({text:'¡Error al cambiar la contraseña!', icon:'error'});
    }
  };

  
  return (
    <div className='w-full max-w-md mx-auto mt-48'>
      <div className='mb-5'>
        <h2 className='text-2xl font-semibold'>Cambia tu contraseña</h2>
        <p className='text-yellow500 text-sm'>
          Por favor, ingresa tu nueva contraseña y confirma.
        </p>
      </div>
      <form className='w-full' onSubmit={handleSubmit}>
        <div className="relative mt-4">
          <Input
            type='password'
            name='newPassword'
            placeholder='Nueva contraseña'
            value={formData.newPassword}
            onChange={handleChange}
            className={`border-2 w-full ${
              formValidations.newPasswordValid === null
                ? 'border-gray-300'
                : formValidations.newPasswordValid
                ? 'border-green-500'
                : 'border-red-500'
            }`}
          />
          {formValidations.newPasswordValid === false && (
            <p className="text-red-500 text-xs">
              La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.
            </p>
          )}
        </div>
        <div className="relative mt-4">
          <Input
            type='password'
            name='confirmPassword'
            placeholder='Confirmar contraseña'
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`border-2 w-full ${
              formValidations.confirmPasswordValid === null
                ? 'border-gray-300'
                : formValidations.confirmPasswordValid
                ? 'border-green-500'
                : 'border-red-500'
            }`}
          />
          {formValidations.confirmPasswordValid === false && (
            <p className="text-red-500 text-xs">
              Las contraseñas no coinciden.
            </p>
          )}
        </div>
        <Button type='submit' label='Cambiar contraseña' className='w-full mt-4' />

        <div className='flex justify-center'>
            <Link href={'/AUTH/forgot_password'}>
             <BackButton />
            </Link>
       
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
