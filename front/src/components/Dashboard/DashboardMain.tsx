// import React from 'react';
// import Card from '../ui/Card';
// import { FaDonate, FaPaw, FaBell } from 'react-icons/fa';
// import DonationChart from '@/components/admin/DonationChart'; // Importa tu nuevo componente
// import StatCard from '../ui/StatCard';
// import { BarChartShelter } from '../ui/BarChart';
// import AllUsers from '../admin/AllUsers';
// import SheltersAll from '../admin/SheltesAll';
// import PendingShelters from '../admin/PendingShelters';

// const DashboardMain: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
//   const totalDonations = 1000; // Ejemplo de valor


  

//   return (
//     <div className="flex-1 p-6 ">
//       {/* <h1 className="text-2xl font-bold mb-4">Bienvenido aca el nombre del usuario o admin </h1> */}
//       {isAdmin ? (
//         <div>
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//             <StatCard />
//             <StatCard />
//             <StatCard />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//             <div className="  col-span-1 md:col-span-1 lg:col-span-1">
//               <AllUsers />
//             </div>
//             <div className=" col-span-1 md:col-span-1 lg:col-span-1">
//               <BarChartShelter />
//             </div>
//             <div className="  col-span-1 md:col-span-1 lg:col-span-1">
//               <SheltersAll />
//             </div>
//             <div className='col-span-1 md:col-span-1 lg:col-span-1'>
//               <PendingShelters/>
//             </div>
            
//           </div>
//         </div>
//       ) : (
//         <div>
//           <p>Bienvenido, Usuario. Aquí puedes ver tus mascotas adoptadas y tus donaciones.</p>
//           {/* Contenido específico para usuarios comunes */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-gray-600">
//             <Card title="Total Donaciones" icon={<FaDonate size={40} className="text-blue-500" />}>
//               <p className="text-xl">${totalDonations}</p>
//             </Card>
//             <Card title="Refugios Favoritos" icon={<FaPaw size={40} className="text-green-500" />}>
//               <p className="text-xl">45</p>
//             </Card>
//             <Card title="Notificaciones" icon={<FaBell size={40} className="text-yellow-500" />}>
//               <p className="text-xl">3</p>
//             </Card>
//           </div>

//           <DonationChart /> {/* Añade el componente del gráfico aquí también si es necesario */}

//           <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//             <h2 className="text-2xl font-bold mb-4">Accesos Rápidos</h2>
//             <div className="flex space-x-4">
//               <a href="/dashboard/donations" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//                 Donaciones
//               </a>
//               <a href="/dashboard/shelter" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
//                 Refugios
//               </a>
//             </div>
//           </div>

//           <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//             <h2 className="text-2xl font-bold mb-4">Gráficos e Informes</h2>
//             <p>Gráficos de donaciones, actividades recientes, etc.</p>
//           </div>

//           <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//             <h2 className="text-2xl font-bold mb-4">Notificaciones y Alertas</h2>
//             <ul>
//               <li className="mb-2">Notificación 1: Donación reciente</li>
//               <li className="mb-2">Notificación 2: Nuevo refugio añadido</li>
//             </ul>
//           </div>

//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Actividades Recientes</h2>
//             <ul>
//               <li className="mb-2">Donación de $100 realizada a Refugio X</li>
//               <li className="mb-2">Refugio Y añadido a favoritos</li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardMain;

import React from 'react';
import Card from '../ui/Card';
import { FaDonate, FaPaw, FaBell } from 'react-icons/fa';
import DonationChart from '@/components/admin/DonationChart';
import StatCard from '../ui/StatCard';
import { BarChartShelter } from '../ui/BarChart';
import AllUsers from '../admin/AllUsers';
import SheltersAll from '../admin/SheltesAll';
import PendingShelters from '../admin/PendingShelters';

const DashboardMain: React.FC<{ role: 'admin' | 'user' | 'shelter' }> = ({ role }) => {
  const totalDonations = 1000; // Ejemplo de valor

  return (
    //* ADMIN---------------------------------------------
    
    <div className="flex-1 p-6 ">
      {role === 'admin' ? (
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <StatCard />
            <StatCard />
            <StatCard />
          </div>
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
        </div>
        //*SHELTER--------------------------------------------------------------
      ) : role === 'shelter' ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Hola, este es la vista del dashboard de refugios</h1>
          {/* Contenido específico para refugios */} 
        </div>
      ) : (
        //*USER-----------------------------------------------
        <div>
          
          <p>Bienvenido, Usuario. Aquí puedes ver tus mascotas adoptadas y tus donaciones.</p>
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
          <DonationChart />
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Accesos Rápidos</h2>
            <div className="flex space-x-4">
              <a href="/dashboard/donations" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Donaciones
              </a>
              <a href="/dashboard/shelter" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Refugios
              </a>
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

