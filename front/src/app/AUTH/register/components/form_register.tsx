'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Swal from 'sweetalert2';
import Link from 'next/link';

const Form_Register: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    birthdate: '',
    phone: '',
    location: ''
  });

  const [formValidations, setFormValidations] = useState({
    nameValid: null,
    last_nameValid: null,
    emailValid: null,
    confirm_passwordValid: null,
    passwordValid: null,
    birthdateValid: null,
    phoneValid: null,
    locationValid: null
  });

  const [error, setError] = useState<string | null>(null);

  const validateFields = {
    name: (value: string) => value.trim().length >= 3,
    last_name: (value: string) => value.trim().length >= 3,
    email: (value: string) => /\S+@\S+\.\S+/.test(value),
    password: (value: string) => value.length >= 6,
    confirm_password: (value: string) => value === formData.password,
    birthdate: (value: string) => {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    },
    phone: (value: string) => /^\d{10}$/.test(value),
    location: (value: string) => value.trim().length > 2
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const validationKey = name;
    setFormValidations(prev => ({
      ...prev,
      [`${validationKey}Valid`]: value === '' ? null : validateFields[name as keyof typeof validateFields](value)
    }));
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    const phoneAsNumber = /^\d{10}$/.test(formData.phone) ? parseInt(formData.phone, 10) : null;

    const allValid = Object.values(formValidations).every(Boolean);
    if (!allValid) {
      setError('Por favor, completa todos los campos correctamente.');
      Swal.fire({
        title: "¡Error!",
        text: "Por favor, completa todos los campos correctamente.",
        icon: "error",
        confirmButtonText: "Entendido",
        timer: 2000,
        customClass: {
          popup: 'max-w-md w-full p-4 bg-white rounded-lg shadow-lg',
          title: 'text-xl font-bold text-gray-700',
          confirmButton: 'bg-green-500 text-white rounded px-4 py-2 mt-2'
        }
      });
      console.log('Validation failed', formValidations);
      return;
    }

    console.log('Datos a enviar:', { ...formData, phone: phoneAsNumber });

    try {
      const response = await fetch('https://huellasdesperanza.onrender.com/auth/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, phone: phoneAsNumber }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorMessage = await response.text();
        setError('Registro fallido. Por favor, inténtalo de nuevo.');
        Swal.fire({
          title: "¡Error!",
          text: "Registro fallido. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 2000,
          customClass: {
            popup: 'max-w-md w-full p-4 bg-white rounded-lg shadow-lg',
            title: 'text-xl font-bold text-gray-700',
            confirmButton: 'bg-green-500 text-white rounded px-4 py-2 mt-2'
          }
        });
        console.error('Error al registrar:', errorMessage);
        return;
      }

      const data = await response.json();
      const token = data.access_token;

      console.log('Registro exitoso, token:', token);

      localStorage.setItem('token', token);
      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Te has registrado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 2000
      }).then(() => {
        router.push('/AUTH/login');
      });

    } catch (error) {
      setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
      Swal.fire({
        title: "¡Error!",
        text: "Hubo un error al registrar. Por favor, inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 2000
      });

    }
  };

  const handleGoogleLogin = () => {
    console.log("Redirigiendo a Google");
    alert("Redirigiendo a Google");
    window.location.href = 'https://huellasdesperanza.onrender.com/google/redirect';
  };

  const handleFacebookLogin = () => {
    console.log("Redirigiendo a Facebook");
    alert("Redirigiendo a Facebook");
    window.location.href = 'https://huellasdesperanza.onrender.com/facebook/redirect';
  };

  return (
    <div className='w-full max-w-md'>
      <div className='mb-5'>
        <h2 className='text-2xl font-semibold'>Regístrate</h2>
        <p className='text-gray-500 text-sm'>
          Por favor, regístrate para poder iniciar sesión y dejar tu huella de esperanza.
        </p>
      </div>
      <form className='w-full' onSubmit={handleRegister}>
        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}
        {['name', 'last_name', 'email', 'password', 'confirm_password', 'birthdate', 'phone', 'location' ].map((field) => (
          <div key={field} className="relative mt-4">
            <Input
              type={field === 'password' || field === 'confirm_password' ? 'password' : field === 'birthdate' ? 'date' : field === 'phone' ? 'number' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className={`border-2 ${
                formValidations[`${field}Valid` as keyof typeof formValidations] === null
                  ? 'border-gray-300'
                  : formValidations[`${field}Valid` as keyof typeof formValidations]
                  ? 'border-green-500'
                  : 'border-red-500'
              }`}
            />
            {formValidations[`${field}Valid` as keyof typeof formValidations] === false && (
              <p className="text-red-500 text-xs">
                {field === 'name' ? 'El nombre no puede estar vacío.' : ''}
                {field === 'last_name' ? 'El apellido no puede estar vacío.' : ''}
                {field === 'email' ? 'Ingrese un correo electrónico válido.' : ''}
                {field === 'password' ? 'La contraseña debe tener al menos 6 caracteres.' : ''}
                {field === 'confirm_password' ? 'La contraseña no coincide.' : ''}
                {field === 'birthdate' ? 'Ingrese una fecha de nacimiento.' : ''}
                {field === 'phone' ? 'Ingrese un número de teléfono válido (10 dígitos).' : ''}
                {field === 'location' ? 'Ingrese una ubicación.' : ''}
              </p>
            )}
          </div>
        ))}
        <Button type='submit' label='Crear cuenta' />
        <div className='mt-5 mb-10 flex flex-col items-center justify-center gap-y-2'>
          <Link href={'https://huellasdesperanza.onrender.com/google/redirect'} >
          <Button type='button' label='Registrarse con Google' onClick={handleGoogleLogin} />
          </Link>

        </div>
        <div className='mt-5 mb-10 flex items-center justify-center gap-x-2'>
          <p className='text-gray-500'>¿Tienes una cuenta?</p>
          <button
            type='button'
            onClick={() => router.push('/AUTH/login')}
            className='font-semibold hover:text-primary transition-colors duration-300'
          >
            Inicia sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form_Register;
