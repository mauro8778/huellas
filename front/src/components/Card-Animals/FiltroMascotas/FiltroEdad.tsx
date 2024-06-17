import React from 'react';

interface FiltroEdadProps {
  edad: string;
  setEdad: (edad: string) => void;
  edades: number[];
}

const FiltroEdad: React.FC<FiltroEdadProps> = ({ edad, setEdad, edades }) => {
  const categoriasEdad = [
    { label: 'Cachorros (1-11 meses)', value: 'cachorro' },
    { label: 'Adultos (1-6 años)', value: 'adulto' },
    { label: 'Señor (6+ años)', value: 'senior' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
      <select
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Todas</option>
        {categoriasEdad.map((categoria, index) => (
          <option key={index} value={categoria.value}>{categoria.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FiltroEdad;
