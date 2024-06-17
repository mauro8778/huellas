// src/components/Layout.tsx
'use client';
import React, { useEffect, useState } from 'react';
import SideNav from '@/components/Dashboard/sidenav';
import SkeletonSideNav from '@/components/skeletons/SkeletonSideNav';
import { checkUserRole } from '@/libs/auth';
import DashboardMainSkeleton from '@/components/skeletons/DashboardMainSkeleton';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateLoading = async () => {
      const role = await checkUserRole();
      setIsAdmin(role === 'admin');
      
      // Simular un retardo de 2 segundos
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    };

    simulateLoading();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen">
        <SkeletonSideNav />
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          {/* Aquí podrías agregar otros elementos del layout skeleton si es necesario */}
        <DashboardMainSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <SideNav isAdmin={isAdmin} />
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {React.cloneElement(children as React.ReactElement, { isAdmin })}
      </main>
    </div>
  );
};

export default Layout;
