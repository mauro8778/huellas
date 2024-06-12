import { saira } from "@/fonts/fonts";
import Image from "next/image";


const Logo: React.FC = () => {
    return (
      <div className="flex items-center justify-center mr-9 ">
        <Image src="/LogoHuellas.svg" alt="Logo" className="w-28 h-auto "  width={100} height={100} />
        <h1 className={`${saira.className}  text-white text-center text-lg md:text-3xl lg:text-lg ml-2 relative`}>
           <span>
            Huellas de Esperanza
            </span>  
        </h1>
       
         
        
          
      </div>
    );
};

export default Logo;
