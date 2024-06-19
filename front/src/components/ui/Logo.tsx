import { saira } from "@/fonts/fonts";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center mr-9 mb-12">
      <div className="w-28 h-auto ">
        <Image src="/LogoHuellas.svg" alt="Logo" className="w-28 h-auto" width={100} height={100} />
      </div>
      <div className={`${saira.className}  fixed   flex  items-center justify-center text-white text-center text-lg md:text-2xl lg:text-lg mt-36 mb-4`}>
        <h1>
          <span>
            {/* Huellas de Esperanza */}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
