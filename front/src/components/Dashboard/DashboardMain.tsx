import React from 'react';
import { FaDonate, FaPaw, FaBell } from 'react-icons/fa';
import Card from '../ui/Card';
import { useDonations } from '@/app/context/DonationsContext';

const DashboardMain: React.FC = () => {
  const { totalDonations } = useDonations();

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-gray-600">
        <Card title="Total Donaciones" icon={<FaDonate size={40} className="text-blue-500" />}>
          <p className="text-xl">${totalDonations}</p>
        </Card>
        <Card title="Refugios Favoritos" icon={<FaPaw size={40} className="text-green-500" />}>
          <p className="text-xl">45</p>
        </Card>
        <Card title="Notificaciones" icon={<FaBell size={40} className="text-yellow-500" />}>
          <p className="text-xl">3</p>
        </Card>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Accesos Rápidos</h2>
        <div className="flex space-x-4">
          <a href="/dashboard/donations" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Donaciones</a>
          <a href="/dashboard/shelter" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Refugios</a>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Gráficos e Informes</h2>
        <p>Gráficos de donaciones, actividades recientes, etc.</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Notificaciones y Alertas</h2>
        <ul>
          <li className="mb-2">Notificación 1: Donación reciente</li>
          <li className="mb-2">Notificación 2: Nuevo refugio añadido</li>
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Actividades Recientes</h2>
        <ul>
          <li className="mb-2">Donación de $100 realizada a Refugio X</li>
          <li className="mb-2">Refugio Y añadido a favoritos</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardMain;
