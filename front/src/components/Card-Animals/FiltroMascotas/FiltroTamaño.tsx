// import React from 'react';

// interface FiltroTamañoProps {
//   tamaño: string;
//   setTamaño: (tamaño: string) => void;
//   tamaños: string[];
// }

// const FiltroTamaño: React.FC<FiltroTamañoProps> = ({ tamaño, setTamaño, tamaños }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
//     <select
//       value={tamaño}
//       onChange={(e) => setTamaño(e.target.value)}
//       className="w-full p-2 border border-gray-300 rounded"
//     >
//       <option value="">Todas</option>
//       {tamaños.map((tam, index) => (
//         <option key={index} value={tam}>{tam}</option>
//       ))}
//     </select>
//   </div>
// );

// export default FiltroTamaño;

import React from 'react';

interface FiltroTamañoProps {
  tamaño: string;
  setTamaño: (tamño: string) => void;
  tamaños: string[];
}

const FiltroTamaño: React.FC<FiltroTamañoProps> = ({ tamaño, setTamaño, tamaños }) => {
  const categoriasTamaño = [
    { label: 'Pequeño', value: 'pequenio' },
    { label: 'Mediano', value: 'mediano' },
    { label: 'Grande', value: 'grande' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
      <select
        value={tamaño}
        onChange={(e) => setTamaño(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Todas</option>
        {categoriasTamaño.map((categoria, index) => (
          <option key={index} value={categoria.value}>{categoria.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FiltroTamaño;