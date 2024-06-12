import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import axios from 'axios';
import Modal from '@/app/modal_search/page'; // Asegúrate de importar el Modal

interface SearchResult {
  id: string;
  name: string;
  sexo: string;
  breed: string;
  species: string;
  age: number;
  month: string;
  description: string;
  pet_size: string;
  imgUrl: string;
  godfather: string | null;
  isCondition: boolean;
  isActive: boolean;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    console.log('Searching for:', searchTerm);
    try {
      const response = await axios.get('https://huellasdesperanza.onrender.com/search', {
        params: { q: searchTerm },
      });
      console.log('Response data:', response.data);
      setResults(response.data);
      setIsModalOpen(true); // Abrir el modal al obtener resultados
    } catch (error) {
      console.error('Error realizando la búsqueda:', error);
      setError('Error realizando la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hidden lg:flex flex-col items-center">
      <form onSubmit={handleSearch} className="flex w-full mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar..."
          className="flex-grow px-2 text-gray-700 focus:outline-none rounded-l-lg"
        />
        <button type="submit" className="flex items-center justify-center px-4 text-white bg-gray-700 rounded-r-lg focus:outline-none">
          <RiSearchLine className="w-5 h-5" />
        </button>
      </form>
      <div className="w-full">
        {loading && <p className="text-gray-700">Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result) => (
              <div key={result.id} className="bg-white p-4 rounded-lg shadow-lg">
                <img src={result.imgUrl} alt={result.name} className="w-full h-40 object-cover rounded-t-lg mb-2" />
                <h3 className="text-lg font-semibold mb-2">{result.name}</h3>
                <p className="text-gray-700">{result.description}</p>
              </div>
            ))}
          </div>
        ) : !loading && (
          <p>No se encontraron resultados.</p>
        )}
      </Modal>
    </div>
  );
};

export default Search;
