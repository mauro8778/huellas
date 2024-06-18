import React, { useState } from 'react';
import FiltroEdad from './FiltroEdad';
import FiltroRaza from './FiltroRaza';
import FiltroTamaño from './FiltroTamaño';
import FiltroEspecie from './FiltroEspecie';
import FiltroSexo from './FiltroSexo';



interface ModalProps {
  onClose: () => void;
  onFilter: (edad: string, tamaño: string, raza: string, sexo: string, especie: string) => void;
  isOpen: boolean;
  edades: number[];
  razas: string[];
  tamaños: string[];
  especies: string[];
  sexos: string[]
}

const ModalFilterMascotas: React.FC<ModalProps> = ({ onClose, onFilter, isOpen, edades, razas, tamaños, especies, sexos }) => {
  const [edad, setEdad] = useState('');
  const [raza, setRaza] = useState('');
  const [tamaño, setTamaño] = useState('');
  const [sexo, setSexo] = useState('');
  const [especie, setEspecie] = useState('');

  const handleFilter = () => {
    onFilter(edad, tamaño, raza, sexo, especie);
    onClose();
  };

  return (
    <div className={`overflow-y-scroll fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-90'}`}>
        <h2 className="text-2xl font-bold mb-4">Filtrar Mascota</h2>
        <FiltroEdad edad={edad} setEdad={setEdad} edades={edades} />
        <FiltroSexo sexo={sexo} setSexo={setSexo} sexos={sexos} />
        <FiltroEspecie especie={especie} setEspecie={setEspecie} especies={especies} />
        <FiltroTamaño tamaño={tamaño} setTamaño={setTamaño} tamaños={tamaños} />
        <FiltroRaza raza={raza} setRaza={setRaza} razas={razas} />
        <div className="flex justify-end space-x-2">
          <button onClick={handleFilter} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-600">Aplicar Filtro</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalFilterMascotas;
