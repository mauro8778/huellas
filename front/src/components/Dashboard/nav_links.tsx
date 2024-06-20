
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {  FaHome, FaUsers } from 'react-icons/fa';
import { MdOutlinePets, MdDashboardCustomize,  } from 'react-icons/md';
import { BiSolidDonateHeart } from 'react-icons/bi';

const userLinks = [
  { name: 'Home', href: '/Home', icon: FaHome },
  { name: 'Dashboard', href: '/dashboard', icon: MdDashboardCustomize },
  { name: 'Donaciones', href: '/dashboard/donations', icon: BiSolidDonateHeart },
  { name: 'Mascotas adoptadas', href: '/dashboard/adopted', icon: MdOutlinePets },
  { name: 'Favoritos', href: '/dashboard/favorites', icon: MdOutlinePets },
];

const adminLinks = [
  { name: 'Home', href: '/Home', icon: FaHome },
  { name: 'Dashboard', href: '/dashboard', icon: MdDashboardCustomize },
  { name: 'Usuarios', href: '/dashboard/all_users', icon: FaUsers },
  { name: 'Refugios', href: '/refugios', icon: MdOutlinePets },
  // { name: 'Reportes', href: '/dashboard/reports', icon: FaChartBar },
  // { name: 'Configuración', href: '/dashboard/settings', icon: MdSettings },
];

const shelterLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: MdDashboardCustomize },
  { name: 'Mis Mascotas', href: '/dashboard/pets', icon: FaHome },
  { name: 'Editar perfil', href: '/dashboard/config-profile', icon: MdOutlinePets },
  { name: 'Agregar tu Mascota', href: '/dashboard/add-pet', icon: MdOutlinePets },
  { name: 'Postulaciones', href: '/dashboard/postulaciones', icon: MdOutlinePets },

];

const NavLinks: React.FC<{ role: 'admin' | 'user' | 'shelter' }> = ({ role }) => {
  const pathname = usePathname();
  const links = role === 'admin' ? adminLinks : role === 'shelter' ? shelterLinks : userLinks;

  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-indigo-300 hover:text-indigo-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-indigo-100 text-indigo-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;

