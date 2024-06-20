
import React, { useState } from 'react';
import { FaDonate, FaPaw, FaBell } from 'react-icons/fa';
import DonationChart from '@/components/admin/DonationChart';
import StatCard from '@/components/ui/StatCard';
import { BarChartShelter } from '@/components/ui/BarChart';
import AllUsers from '@/components/admin/AllUsers';
import SheltersAll from '@/components/admin/SheltesAll';
import PendingShelters from '@/components/admin/PendingShelters';
import BannerAdmin from '../admin/BannerAdmin.tsx';
import Link from 'next/link';

interface DashboardMainProps {
  role: 'admin' | 'user' | 'shelter';
}

const DashboardMain: React.FC<DashboardMainProps> = ({ role }) => {
  const totalDonations = 1000; 

  return (
    <div className="flex-1 p-6">
      {role === 'admin' ? (
        <div>
          {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <StatCard title="Total Donaciones" icon={<FaDonate size={40} className="text-blue-500" />}>
              <p className="text-xl">${totalDonations}</p>
            </StatCard>
            <StatCard title="Refugios Favoritos" icon={<FaPaw size={40} className="text-green-500" />}>
              <p className="text-xl">45</p>
            </StatCard>
            <StatCard title="Notificaciones" icon={<FaBell size={40} className="text-yellow-500" />}>
              <p className="text-xl">3</p>
            </StatCard>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <AllUsers />
            </div>
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <BarChartShelter />
            </div>
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <SheltersAll />
            </div>
            <div className='col-span-1 md:col-span-1 lg:col-span-1'>
              <PendingShelters />
            </div>
          </div>
          <div className="mt-6">
            <BannerAdmin />
          </div>
        </div>
      ) : role === 'shelter' ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Hola, este es la vista del dashboard de refugios</h1>
      
    </div>
        
      ) : (
        <div>
          <p>Bienvenido, Usuario. Aquí puedes ver tus mascotas adoptadas y tus donaciones.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-gray-600">
            <StatCard title="Total Donaciones" icon={<FaDonate size={40} className="text-blue-500" />}>
              <p className="text-xl">${totalDonations}</p>
            </StatCard>
            <StatCard title="Refugios Favoritos" icon={<FaPaw size={40} className="text-green-500" />}>
              <p className="text-xl">45</p>
            </StatCard>
            <StatCard title="Notificaciones" icon={<FaBell size={40} className="text-yellow-500" />}>
              <p className="text-xl">3</p>
            </StatCard>
          </div>
          <DonationChart />
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Accesos Rápidos</h2>
            <div className="flex space-x-4">
              <Link href="/dashboard/donations">
                <p className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Donaciones</p>
              </Link>
              <Link href="/dashboard/shelter">
                <p className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Refugios</p>
              </Link>
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
      )}
    </div>
  );
};

export default DashboardMain;
