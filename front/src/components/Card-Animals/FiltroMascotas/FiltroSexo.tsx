import React from 'react';

interface FiltroSexoProps {
  sexo: string;
  setSexo: (sexo: string) => void;
  sexos: string[];
}

const FiltroSexo: React.FC<FiltroSexoProps> = ({ sexo, setSexo, sexos }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
    <select
      value={sexo}
      onChange={(e) => setSexo(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded">
      <option value="">Todas</option>
      {sexos.map((sex, index) => (
        <option key={index} value={sex}>{sex}</option>
      ))}
    </select>
  </div>
);

export default FiltroSexo;
