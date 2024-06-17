'use client';

import { useEffect, useState } from 'react';
import { checkUserRole } from '@/libs/auth';
// import SimulateLogin from '../SIMULATE_LOGIN/page';
import DashboardMain from '@/components/Dashboard/DashboardMain';
import withAuth from '@/HOC/withAuth';


export const DashboardPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = checkUserRole();
    setIsAdmin(role === 'admin');
  }, []);

  return (
    <div className="flex h-screen">
     
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {/* <SimulateLogin /> //*SIMULACION DE LOGIN "BORRAR"    */}
        <DashboardMain isAdmin={isAdmin} />
      </main>
    </div>
  );
};

export default withAuth(DashboardPage);
