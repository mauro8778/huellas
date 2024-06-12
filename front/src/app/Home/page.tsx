import React from "react";
import Image from "next/image";
import RandomRefugiosCards from "@/components/Refugios/RandomRefugiosCards";
import RandomAnimalCards from "@/components/Card-Animals/RandomAnimalsCards";

export const Home: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Banner */}
      <div className="relative w-full h-[600px]  ">
        <Image
          src="/bannerNav.png"
          alt="Wave Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-xl border-4 "
        />
      </div>
      

      <div className="relative z-0 mt-10 ml-10">
        <RandomAnimalCards/>
        <RandomRefugiosCards/>
      </div>
      
    </div>
  );
};

export default Home;
