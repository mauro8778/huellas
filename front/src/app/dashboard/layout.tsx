// import SideNav from '@/app/dashboard/sidenav';

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
//       <div className="w-full flex-none md:w-64">
//         <SideNav />
//       </div>
//       <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
//         {children}
//       </div>
//     </div>
//   );
// }
'use client';

import React from 'react';
import SideNav from '@/components/Dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideNav />
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};


