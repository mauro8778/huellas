import React from 'react';
import Image from 'next/image';
import { IRefugios } from '@/interface/IRefugios';

const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

const CardRefuge: React.FC<{ refugio: IRefugios }> = ({ refugio }) => {
  const truncatedTitle = refugio.shelter_name ? truncateDescription(refugio.shelter_name, 25) : '';
  const truncatedDescription = refugio.description ? truncateDescription(refugio.description, 55) : '';
  return (
    <div className="bg-transparent rounded-lg shadow-2xl p-4 m-2 md:m-4 max-w-xs mx-auto transform transition-transform duration-200 hover:scale-105">
      <div className="h-64 relative overflow-hidden rounded-t-lg">
        <Image src={refugio.imgUrl} alt={refugio.name} layout="fill" objectFit="cover" />
      </div>
      <div className="mt-4">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">{truncatedTitle}</h5>
        <p className="mt-2 text-gray-700 dark:text-gray-400">{refugio.location} - {refugio.zona}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-400">{truncatedDescription}</p>
        <a href={`/refugios/${refugio.id}`} className="border border-gray-500 inline-block mt-4 px-4 py-2 text-sm font-semibold text-black rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
          Leer más
        </a>
      </div>
    </div>
  );
};

export default CardRefuge;
