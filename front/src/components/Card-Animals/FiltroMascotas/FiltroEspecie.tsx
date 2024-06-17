import React from 'react';

interface FiltroEspecieProps {
  especie: string;
  setEspecie: (especie: string) => void;
  especies: string[];
}

const FiltroEspecie: React.FC<FiltroEspecieProps> = ({ especie, setEspecie, especies }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">Perro o Gato?</label>
    <select
      value={especie}
      onChange={(e) => setEspecie(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded">
      <option value="">Todas</option>
      {especies.map((esp, index) => (
        <option key={index} value={esp}>{esp}</option>
      ))}
    </select>
  </div>
);

export default FiltroEspecie
;
