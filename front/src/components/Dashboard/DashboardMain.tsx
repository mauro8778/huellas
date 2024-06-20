
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
         
        </div>
      )}
    </div>
  );
};

export default DashboardMain;
