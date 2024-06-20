/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/Textarea';
import Swal from 'sweetalert2';

interface FormData {
  name: string;
  dni: string;
  phone: string;
  shelter_name: string;
  address: string;
  description: string;
}

interface Validations {
  nameValid: boolean | null;
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
    dni: '',
    phone: '',
    shelter_name: '',
    address: '',
    description: ''
  });

  const [validations, setValidations] = useState<Validations>({
    nameValid: null,
    dniValid: null,
    phoneValid: null,
    shelterNameValid: null,
    addressValid: null,
    descriptionValid: null
  });

  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    const accessToken = userSession ? JSON.parse(userSession).access_token : null;

    if (!accessToken) {
      Swal.fire('No estás autenticado. Por favor, inicia sesión para continuar.');
      return;
    }
    setToken(accessToken);
  }, []);

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    switch (name) {
      case 'phone':
        setValidations({
          ...validations,
          phoneValid: value ? validatePhone(value) : true
        });
        break;
      case 'dni':
        setValidations({
          ...validations,
          dniValid: value ? !isNaN(Number(value)) && Number(value) > 0 : null
        });
        break;
      case 'name':
        setValidations({
          ...validations,
          nameValid: value ? value.length >= 2 : null
        });
        break;
      case 'shelter_name':
        setValidations({
          ...validations,
          shelterNameValid: value ? value.length >= 2 : null
        });
        break;
      case 'address':
        setValidations({
          ...validations,
          addressValid: value ? value.length > 0 : null
        });
        break;
      case 'description':
        setValidations({
          ...validations,
          descriptionValid: value ? value.length >= 10 && value.length <= 300 : null
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const filledFields: Partial<FormData> = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (value !== '') {
        filledFields[key as keyof FormData] = value;
      }
    });

    console.log(filledFields);
    
    if (Object.keys(filledFields).length === 0) {
      setError('Por favor, complete al menos un campo.');
      return;
    }

    try {
      console.log('entro');

      const response = await fetch(`https://huellasdesperanza.onrender.com/shelters/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...filledFields}),
      });
      console.log('salio');
      console.log(response);      

      if (response.ok) {
        Swal.fire({
          title: "¡Actualización exitosa!",
          text: "Tu perfil se ha actualizado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
          timer: 2500
        }).then(() => {
          router.push('/AUTH/login');
        });
      } else {
        setError(`Error en la actualización: 'Error desconocido'}`);
        Swal.fire({
          title: "¡Algo salió mal!",
          text: "No se pudo actualizar tu perfil. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 3000,
        });
      }
    } catch (error) {
      setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="w-full ml-80 max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Modifica tu Perfil</h2>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'name', placeholder: 'Nombre', validation: validations.nameValid, errorMessage: 'El nombre debe tener al menos 2 caracteres.', optional: true },
            { name: 'dni', placeholder: 'DNI', validation: validations.dniValid, errorMessage: 'El DNI no puede estar vacío.', optional: true },
            { name: 'phone', placeholder: 'Teléfono', validation: validations.phoneValid, errorMessage: 'El teléfono debe tener 10 dígitos.', optional: true },
            { name: 'shelter_name', placeholder: 'Nombre del Refugio', validation: validations.shelterNameValid, errorMessage: 'El nombre del refugio debe tener al menos 2 caracteres.', optional: true },
            { name: 'address', placeholder: 'Dirección: nombre de la calle y número, localidad', validation: validations.addressValid, errorMessage: 'La dirección no puede estar vacía.', fullWidth: true, optional: true }
          ].map(({ name, placeholder, validation, errorMessage, fullWidth = false }) => (
            <div key={name} className={`relative ${fullWidth ? 'col-span-2' : ''}`}>
              <Input
                type={name === 'dni' || name === 'phone' ? 'number' : 'text'}
                name={name}
                placeholder={placeholder}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className={`border ${validation === null ? '' : validation ? 'border-green-500' : 'border-red-500'} w-full`}
              />
              {validation === false && <p className="text-red-500 text-xs">{errorMessage}</p>}
            </div>
          ))}
        </div>
        <div className="relative w-full">
          <TextArea
            name="description"
            placeholder="Describe aquí tu refugio..."
            value={formData.description}
            onChange={handleChange}
            className={`border ${validations.descriptionValid === null ? 'border-gray-300' : validations.descriptionValid ? 'border-green-500' : 'border-red-500'} w-full`}
            rows={4}
          />
          {validations.descriptionValid === false && (
            <p className="text-red-500 text-xs">La descripción debe tener entre 10 y 300 caracteres.</p>
          )}
        </div>
        <Button type="submit" label="Aplicar" className="w-full mt-4" />
      </form>
    </div>
  );
};

export default ShelterForm;
