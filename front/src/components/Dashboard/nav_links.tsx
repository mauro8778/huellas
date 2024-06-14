import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FaChartBar, FaHome, FaUsers } from "react-icons/fa";
import { MdOutlinePets, MdDashboardCustomize, MdOutlineMiscellaneousServices, MdSettings } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";

const userLinks = [
  { name: "Home", href: "/Home", icon: FaHome },
  { name: "Dashboard", href: "/dashboard", icon: MdDashboardCustomize },
  { name: "Donaciones", href: "/dashboard/donations", icon: BiSolidDonateHeart },
  { name: "Mascotas adoptadas", href: "/dashboard/adopted", icon: MdOutlinePets },
  { name: "Favoritos", href: "/dashboard/favorites", icon: MdOutlinePets },
];

const adminLinks = [
  { name: "Home", href: "/Home", icon: FaHome },
  { name: "Dashboard", href: "/dashboard", icon: MdDashboardCustomize },
  { name: "Usuarios", href: "/dashboard/all_users", icon: FaUsers },
  { name: "Refugios", href: "/dashboard/shelters", icon: MdOutlinePets },
  // { name: "Mascotas Perdidas", href: "/dashboard/lost-pets", icon: MdOutlinePets},
  // { name: "Mascotas Adoptadas", href: "/dashboard/adopted-pets", icon: MdOutlinePets },
  // { name: "Donaciones", href: "/dashboard/donations", icon: BiSolidDonateHeart },
  // { name: "Servicios Ofrecidos", href: "/dashboard/services", icon: MdOutlineMiscellaneousServices },
  { name: "Reportes", href: "/dashboard/reports", icon: FaChartBar },
  { name: "Configuración", href: "/dashboard/settings", icon: MdSettings },
];

const NavLinks = ({ isAdmin }: { isAdmin: boolean }) => {
  const pathname = usePathname();
  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="flex flex-col gap-2 ">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-pink-200 hover:text-pink-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-pink-100 text-pink-600": pathname === link.href,
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
