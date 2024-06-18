// 'use client';

// import { useEffect, useState } from 'react';
// import { checkUserRole } from '@/libs/auth';
// // import SimulateLogin from '../SIMULATE_LOGIN/page';
// import DashboardMain from '@/components/Dashboard/DashboardMain';
// import withAuth from '@/HOC/WithAuth';



// const DashboardPage: React.FC = () => {
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const role = checkUserRole();
//     setIsAdmin(role === 'admin');
//   }, []);

//   return (
//     <div className="flex h-screen">
     
//       <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
//         {/* <SimulateLogin /> //*SIMULACION DE LOGIN "BORRAR"    */}
//         <DashboardMain isAdmin={isAdmin} />
//       </main>
//     </div>
//   );
// };

// export default withAuth(DashboardPage);

'use client';

import { useEffect, useState } from 'react';
import { checkUserRole } from '@/libs/auth';
import DashboardMain from '@/components/Dashboard/DashboardMain';
import withAuth from '@/HOC/WithAuth';

const DashboardPage: React.FC = () => {
  const [role, setRole] = useState<'admin' | 'user' | 'shelter'>('user');

  useEffect(() => {
    const role = checkUserRole();
    setRole(role);
  }, []);

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        <DashboardMain role={role} />
      </main>
    </div>
  );
};

export default withAuth(DashboardPage);
