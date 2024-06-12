

import React from 'react';
import { IRefugios } from '@/interface/IRefugios';
import CardRefuge from './CardRefuge';

interface ListaRefugiosProps {
  refugios: IRefugios[];
}

const ListaRefugios: React.FC<ListaRefugiosProps> = ({ refugios }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
      {refugios.map((refugio, index) => (
        <CardRefuge key={index} refugio={refugio} />
      ))}
    </div>
  );
};

export default ListaRefugios;
