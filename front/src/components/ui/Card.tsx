// import DonationsUI from '@/app/dashboard/donations/page';
// import React from 'react';

// interface CardProps {
//   title: string;
//   children: React.ReactNode;
// }

// export const Card: React.FC<CardProps> = ({ title, children }) => {
//   return (
//     <div className='bg-lime-100 rounded-lg shadow p-4 max-w-3xl max-h-64   '>
//       <h2 className="text-xl font-semibold mb-2">{title}</h2>
//       <DonationsUI />
//       <div>{children}</div>
//     </div>
//   );
// };

// export default Card;

import  { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, icon }) => {
    return (
      <div className="bg-white shadow-2xl rounded-lg p-6 flex items-center hover:shadow-lg transition-shadow duration-300 ease-in-out">
        {icon && <div className="mr-4">{icon}</div>}
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    );
  };
  

export default Card;
