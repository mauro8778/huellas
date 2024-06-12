// import React from 'react';
// import Donations_user from './@donations/page';
// import Adopted_User from './@adopted/page';
// import Shelter_user from './@shelter/page';
// import { Card } from '@/components/ui/Card';

// const Dashboard = () => {
//   return (
//     <div className='flex flex-col items-center justify-center  bg-red-400 min-h-screen p-4 mt-20'>
//       <div className='max-w-screen-lg w-full'>
//         <div className='flex flex-col space-y-8 md:flex-row md:space-x-8'>
//           <div className='flex-1'>
//             <Card title="Donaciondes">
//               <Donations_user />
//             </Card>
//           </div>
//           <div className='flex-1'>
//             {/* <Card title="Adopted Pets">
//               <Adopted_User />
//             </Card> */}
//           </div>
//         </div>
//         <div className='flex-1 mt-8'>
//           {/* <Card title="Shelters">
//             <Shelter_user />
//           </Card> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
'use client';

import { useEffect, useState } from 'react';
import DashboardMain from '@/components/Dashboard/DashboardMain';
import DonationsUI from './donations/page';
import { IDonation } from '@/types';

export const DashboardPage: React.FC = () => {
  const [donations, setDonations] = useState<IDonation[]>([]);

  useEffect(() => {
    // Cargar donaciones desde el localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedDonations = localStorage.getItem('donations');
      if (savedDonations) {
        setDonations(JSON.parse(savedDonations));
      }
    }
  }, []);

  return (
    <div>
      <DashboardMain/>

      
    </div>
  );
};

export default DashboardPage;
