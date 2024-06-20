'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { IErrorProps, ILogingProps } from '@/types';
import Swal from "sweetalert2";
import ButtonGoogle from '@/components/ui/ButtonGoogle';
import ButtonFacebook from '@/components/ui/ButtonFacebook';

const Form_Login: React.FC = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<ILogingProps>({ email: "", password: "" });
  const [errorData, setErrorData] = useState<IErrorProps>({ email: "", password: "" });
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setUserData({ ...userData, email });
    if (email === "") {
      setEmailValid(null);
      setErrorData({ ...errorData, email: "" });
    } else if (validateEmail(email)) {
      setEmailValid(true);
      setErrorData({ ...errorData, email: "" });
    } else {
      setEmailValid(false);
      setErrorData({ ...errorData, email: "Ingrese un correo electrónico válido." });
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setUserData({ ...userData, password });
    if (password === "") {
      setPasswordValid(null);
      setErrorData({ ...errorData, password: "" });
    } else if (validatePassword(password)) {
      setPasswordValid(true);
      setErrorData({ ...errorData, password: "" });
    } else {
      setPasswordValid(false);
      setErrorData({ ...errorData, password: "La contraseña debe tener al menos 6 caracteres." });
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validateEmail(userData.email) || !validatePassword(userData.password)) {
      setError("Por favor, corrige los errores en el formulario.");
      return;
    }

    try {
      const response = await fetch("https://huellasdesperanza.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const data = await response.json();
      console.log('Datos de la respuesta:', data);

      const { access_token, id_token } = data;
      localStorage.setItem("userSession", JSON.stringify({ access_token, id_token }));
      console.log('Datos de la sesión del usuario almacenados en localStorage:', { access_token, id_token });

      Swal.fire({
        title: "¡Inicio de sesión exitoso!",
        text: "Te has logeado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 2000
      }).then(() => {
        router.push("/dashboard");
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        title: "¡Error!",
        text: "Hubo un error al iniciar sesión. Por favor, inténtalo nuevamente.",
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

  const handleGoogleLogin = async () => {
    window.location.href = 'https://huellasdesperanza.onrender.com/google';
  };

/*   const handleFacebookLogin = () => {
    console.log("Redirigiendo a Facebook");
    alert("Redirigiendo a Facebook");
    window.location.href = 'https://huellasdesperanza.onrender.com/facebook';
  }; */

  return (
    <div className='w-full max-w-md'>
      <div className='mb-5'>
        <h2 className='text-2xl font-semibold'>Bienvenido, ingresa!</h2>
        <p className='text-yellow500 text-sm'>
          Por favor, ingresa tu mail y contraseña para entrar en la aplicación
        </p>
      </div>
      <form className='w-full' onSubmit={handleLogin}>
        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}
        <div className="relative">
          <Input
            type='text'
            name='email'
            placeholder='Email'
            value={userData.email}
            onChange={handleEmailChange}
            className={`w-full ${emailValid === false ? 'border-red-500' : emailValid === true ? 'border-green-500' : ''}`}
            isValid={emailValid}
          />
          {emailValid === false && <p className="text-red-500 text-xs">Ingrese un correo electrónico válido.</p>}
        </div>
        <div className="relative mt-4">
          <Input
            type='password'
            name='password'
            placeholder='Contraseña'
            value={userData.password}
            onChange={handlePasswordChange}
            className={`w-full ${passwordValid === false ? 'border-red-500' : passwordValid === true ? 'border-green-500' : ''}`}
            isValid={passwordValid}
          />
          {passwordValid === false && <p className="text-red-500 text-xs">La contraseña debe tener al menos 6 caracteres.</p>}
        </div>
        <div className='flex justify-end mb-5'>
          <button
            type='button'
            onClick={() => router.push('/AUTH/forgot_password')}
            className='text-yellow500 hover:text-indigo-500 transition-colors duration-300'
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <Button type='submit' label='Ingresar' />
        <div className='mt-5 mb-10 flex flex-col items-center justify-center gap-y-2'>
          <ButtonGoogle type='button' label='Ingresar con Google' onClick={handleGoogleLogin} className={''} />
{/*           <ButtonFacebook type='button' label='Ingresar con Facebook' onClick={handleFacebookLogin} className={''} /> */}
        </div>
        <div className='mt-5 mb-10 flex items-center justify-center gap-x-2'>
          <p className='text-yellow500'>¿No tienes una cuenta?</p>
          <button
            type='button'
            onClick={() => router.push('/option_register')}
            className='font-semibold hover:text-indigo-500 transition-colors duration-300'
          >
            Regístrate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form_Login;
