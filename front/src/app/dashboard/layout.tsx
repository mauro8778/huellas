'use client';
import React, { useEffect, useState } from 'react';
import SideNav from '@/components/Dashboard/sidenav';
import { checkUserRole } from '@/libs/auth';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = checkUserRole();
    setIsAdmin(role === 'admin');
  }, []);

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
