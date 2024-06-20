'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/Textarea';
import Swal from 'sweetalert2';
import HomeButton from '@/components/ui/HomeButton';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  password: string;
  dni: number | '';
  phone: number | '';
  shelter_name: string;
  address: string;
  description: string;
}

interface Validations {
  nameValid: boolean | null;
  emailValid: boolean | null;
  passwordValid: boolean | null;
  passwordStrength: string;
  dniValid: boolean | null;
  phoneValid: boolean | null;
  shelterNameValid: boolean | null;
  addressValid: boolean | null;
  descriptionValid: boolean | null;
}

const ShelterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    dni: '',
    phone: '',
    shelter_name: '',
    address: '',
    description: ''
  });

  const [validations, setValidations] = useState<Validations>({
    nameValid: null,
    emailValid: null,
    passwordValid: null,
    passwordStrength: '',
    dniValid: null,
    phoneValid: null,
    shelterNameValid: null,
    addressValid: null,
    descriptionValid: null
  });

  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    let strength = 'Débil';
    if (hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      strength = 'Fuerte';
    } else if (hasMinLength && (hasUppercase || hasLowercase) && hasNumber && hasSpecialChar) {
      strength = 'Medio';
    }
  
    return {
      valid: hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
      strength,
    };
  };
  

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: name === 'dni' || name === 'phone' ? Number(value) : value });

    switch (name) {
      case 'email':
        setValidations({ ...validations, emailValid: value ? validateEmail(value) : null });
        break;
      case 'password':
        const passwordValidation = validatePassword(value);
        setValidations({
          ...validations,
          passwordValid: value ? passwordValidation.valid : null,
          passwordStrength: value ? passwordValidation.strength : ''
        });
        break;
      case 'phone':
        setValidations({ ...validations, phoneValid: value ? validatePhone(value) : null });
        break;
      case 'dni':
        setValidations({ ...validations, dniValid: value ? !isNaN(Number(value)) && Number(value) > 0 : null });
        break;
      case 'name':
        setValidations({ ...validations, nameValid: value ? value.length >= 2 : null });
        break;
      case 'shelter_name':
        setValidations({ ...validations, shelterNameValid: value ? value.length >= 2 : null });
        break;
      case 'address':
        setValidations({ ...validations, addressValid: value ? value.length > 0 : null });
        break;
      case 'description':
        setValidations({ ...validations, descriptionValid: value ? value.length >= 10 && value.length <= 300 : null });
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const someInvalid = Object.values(validations).some(valid => valid === false);

    if (!someInvalid) {
      try {

        if (!selectedFile) {
          console.error('No file selected');
          return;
        }

        const formsData = new FormData();
        formsData.append('file', selectedFile);

        const responses = await fetch('https://huellasdesperanza.onrender.com/files/uploadFile', {
          method: 'POST',
          body: formsData,
        });

        if (!responses.ok) {
          throw new Error('Failed to upload file.');
        }

        const imageUrl = await responses.text();

        const newFormData = {...formData, imgUrl:imageUrl}

        const response = await fetch('https://huellasdesperanza.onrender.com/auth/register/shelter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFormData),
        });

        if (response.ok) {
          Swal.fire({
            title: "¡Registro exitoso!",
            text: "Te has registrado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            timer: 2500
          }).then(() => {
            router.push('/AUTH/login');
          });
        } else {
          const errorData = await response.json();
          console.error('Error en la respuesta:', errorData);
          setError(`Error en el registro: ${errorData.message || 'Error desconocido'}`);
          Swal.fire({
            title: "¡Algo salió mal!",
            text: "Tu refugio no pudo ser registrado. Por favor, inténtalo de nuevo.",
            icon: "error",
            confirmButtonText: "Aceptar",
            timer: 3000,
          });
        }
      } catch (error) {
        console.error('Error en el registro:', error);
        setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    } else {
      setError('Por favor, completa todos los campos correctamente.');
    }
  };
  

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Registra tu Refugio</h2>
        <p className="text-gray-500 text-sm">
          Por favor registre su refugio para poder recibir ayuda y dejar su huella de esperanza.
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'name', placeholder: 'Nombre', validation: validations.nameValid, errorMessage: 'El nombre debe tener al menos 2 caracteres.' },
            { name: 'email', placeholder: 'Email', validation: validations.emailValid, errorMessage: 'Ingrese un correo electrónico válido.' },
            { name: 'password', placeholder: 'Contraseña', validation: validations.passwordValid, errorMessage: 'La contraseña debe contener una mayucula, una minuscula, un numero y un caracter especial.', isPassword: true },
            { name: 'dni', placeholder: 'DNI', validation: validations.dniValid, errorMessage: 'El DNI no puede estar vacío.' },
            { name: 'phone', placeholder: 'Teléfono', validation: validations.phoneValid, errorMessage: 'El teléfono debe tener 10 dígitos y el prefijo debe ser 11 .' },
            { name: 'shelter_name', placeholder: 'Nombre del Refugio', validation: validations.shelterNameValid, errorMessage: 'El nombre del refugio debe tener al menos 2 caracteres.' },
            { name: 'address', placeholder: 'Dirección: nombre de la calle y número, localidad', validation: validations.addressValid, errorMessage: 'La dirección no puede estar vacía.', fullWidth: true }
          ].map(({ name, placeholder, validation, errorMessage, isPassword = false, fullWidth = false }) => (
            <div key={name} className={`relative ${fullWidth ? 'col-span-2' : ''}`}>
              <Input
                type={isPassword ? 'password' : name === 'dni' || name === 'phone' ? 'number' : 'text'}
                name={name}
                placeholder={placeholder}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className={`border ${
                  validation === null ? '' : validation ? 'border-green-500' : 'border-red-500'
                } w-full`}
              />
              {validation === false && <p className="text-red-500 text-xs">{errorMessage}</p>}
              {name === 'password' && validation !== null && (
                <p className={`text-xs ${validations.passwordValid ? 'text-green-500' : 'text-red-500'}`}>
                  Fortaleza de la contraseña: {validations.passwordStrength}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="relative w-full">
          <TextArea
            name="description"
            placeholder="Describe aquí tu refugio..."
            value={formData.description}
            onChange={handleChange}
            className={`border ${
              validations.descriptionValid === null ? 'border-gray-300' : validations.descriptionValid ? 'border-green-500' : 'border-red-500'
            } w-full`}
            rows={4}
          />
          {validations.descriptionValid === false && (
            <p className="text-red-500 text-xs">La descripción debe tener entre 10 y 300 caracteres.</p>
          )}
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
          Imagen del Refugio
        </label>
        <input
          id="imagen"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>

        <Button type="submit" label="Crear cuenta" className="w-full mt-4" />
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-yellow500">¿Tienes una cuenta?</p>
          <button
            type="button"
            onClick={() => router.push('/AUTH/login')}
            className="font-semibold hover:text-primary transition-colors duration-300"
          >
            Iniciar sesión
          </button>
        </div>
        <div className='flex justify-center'>
            <Link href={'/Home'}>
             <HomeButton />
            </Link>
       
        </div>
      </form>
    </div>
  );
};

export default ShelterForm;


