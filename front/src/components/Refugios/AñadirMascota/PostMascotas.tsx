import React, { useState } from 'react';
import { IMascotas } from '@/interface/IMascotas';

interface FormularioMascotaProps {
  onClose: () => void;
  onAddMascota: (mascota: IMascotas) => void;
}

const FormularioMascota: React.FC<FormularioMascotaProps> = ({ onClose, onAddMascota }) => {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState<number | null>(null);
  const [mes, setMes] = useState('');
  const [tamaño, setTamaño] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userSessionString = localStorage.getItem('userSession');
    if (!userSessionString) {
      alert('No hay una sesión de usuario activa.');
      return;
    }
    const userSession = JSON.parse(userSessionString);
    const token = userSession.access_token;
    console.log('asdasd', token);
    

    if (nombre && sexo && raza && edad !== null  && mes !== null  &&tamaño && selectedFile && especie) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('https://huellasdesperanza.onrender.com/files/uploadFile', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file.');
        }

        const imageUrl = await response.text();

        const nuevaMascota: IMascotas = {
          name: nombre,
          sexo: sexo,
          breed: raza,
          age: edad,
          month: mes,
          pet_size: tamaño,
          description: descripcion,
          imgUrl: imageUrl, 
          specie: especie,
        };

        const mascotaResponse = await fetch('https://huellasdesperanza.onrender.com/pets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(nuevaMascota),
        });

        if (!mascotaResponse.ok) {
          throw new Error('Failed to add pet.');
        }

        onAddMascota(nuevaMascota);
        alert('Mascota agregada correctamente');
        onClose();
      } catch (error) {
        alert('Ocurrió un error al agregar la mascota. Por favor, intente nuevamente.');
      }
    } else {
      alert('Por favor complete todos los campos y seleccione una imagen.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-4" encType="multipart/form-data">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          Nombre de la Mascota
        </label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="especie">
          ¿Perro o Gato?
        </label>
        <select
          id="especie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione una opción</option>
          <option value="Macho">Perro</option>
          <option value="Hembra">Gato</option>
        </select>
      </div>

      <div className="flex mb-4">
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edad">
            Edad de la Mascota 
          </label>
          <input
            id="edadAños"
            type="number"
            value={edad !== null ? edad : ''}
            onChange={(e) => setEdad(e.target.value ? parseInt(e.target.value) : null)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Edad"
          />
        </div>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mes">
            Meses o Años
          </label>
          <input
            id="edadMeses"
            type="text"
            value={mes !== null ? mes : ''}
            onChange={(e) => setMes(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Mes"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sexo">
          Sexo
        </label>
        <select
          id="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione una opción</option>
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tamaño">
          Tamaño
        </label>
        <select
          id="tamaño"
          value={tamaño}
          onChange={(e) => setTamaño(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione una opción</option>
          <option value="Little">Pequeño</option>
          <option value="Medium">Mediano</option>
          <option value="Big">Grande</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
          Descripción
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          Raza
        </label>
        <input
          id="raza"
          type="text"
          value={raza}
          onChange={(e) => setRaza(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
          Imagen de la Mascota
        </label>
        <input
          id="imagen"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button type="submit" className="text-white bg-green-700 from-green-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Enviar
      </button>
    </form>
  );
};

export default FormularioMascota;

