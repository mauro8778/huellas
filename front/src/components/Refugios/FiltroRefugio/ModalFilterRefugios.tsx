import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
  onFilter: (ubicacion: string, zona: string) => void;
  isOpen: boolean;
  ubicaciones: string[];
  zonas: string[];
}

const ModalFilter: React.FC<ModalProps> = ({ onClose, onFilter, isOpen, ubicaciones, zonas }) => {
  const [ubicacion, setUbicacion] = useState('');
  const [zona, setZona] = useState('');

  const handleFilter = () => {
    onFilter(ubicacion, zona);
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-90'}`}>
        <h2 className="text-2xl font-bold mb-4">Filtrar Refugios</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
          <select
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded">
            <option value="">Todas</option>
            {ubicaciones.map((ubic, index) => (
              <option key={index} value={ubic}>{ubic}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Zona</label>
          <select
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded">
            <option value="">Todas</option>
            {zonas.map((zona, index) => (
              <option key={index} value={zona}>{zona}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={handleFilter} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Aplicar Filtro</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
