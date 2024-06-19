import Image from 'next/image';
import React from 'react';

const NuestrosDatos = () => {
  return (
    <div className="flex justify-between">
      <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mb-2">
        <Image src="/imgs/Maximiliano.jpg" width={500} height={500} alt="Imagen 1" className="w-full h-full object-cover" />
      </div>
      
      <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
        <Image src="/imgs/JuanCarlos.jpg" width={500} height={500} alt="Imagen 2" className="w-full h-full object-cover" />
      </div>

      <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
        <Image src="/imgs/Tomas.png" width={500} height={500} alt="Imagen 3" className="w-full h-full object-cover" />
      </div>

      <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
        <Image src="/imgs/Jonatan.jpg" width={500} height={500} alt="Imagen 4" className="w-full h-full object-cover" />
      </div>

      <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
        <Image src="/imgs/Mauricio.jpg" width={500} height={500} alt="Imagen 5" className="w-full h-full object-cover" />
      </div>

      <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
        <Image src="/imgs/Mauro.jpg" width={500} height={500} alt="Imagen 6" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default NuestrosDatos;
