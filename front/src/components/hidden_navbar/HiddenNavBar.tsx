'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface HiddenNavBarProps {
  children: ReactNode;
}

const HiddenNavBar: React.FC<HiddenNavBarProps> = ({ children }) => {
  const pathname = usePathname();
  const hiddenPaths = [ 
    '/',
    '/AUTH/forgot_password', 
    '/AUTH/register', 
    '/dashboard', 
    '/dashboard/admin', 
    '/dashboard/user',
    '/dashboard/shelter',
    '/dashboard/donations',
    '/dashboard/petslost',
    '/dashboard/adopted',
    '/dashboard/postulaciones',
    '/dashboard/add-pet',
    '/dashboard/config-profile',
    '/dashboard/pets',
    '/AUTH/login',
    '/option_register',
    '/AUTH/shelter_register',
    '/AUTH/new_password',
    '/AUTH/callback',

];
  const isHidden = hiddenPaths.includes(pathname);

  return (
    <div className={isHidden ? 'hidden' : ''}>
      {children}
    </div>
  );
};

export default HiddenNavBar;
