// pages/index.tsx
import React from "react";
import Image from "next/image";
import BannerPromocional from "@/components/admin/PromotionBaner";
import RandomAnimalsCards from "@/components/Card-Animals/RandomAnimalsCards";


const Home: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Banner Estático */}
      <div className="relative w-full h-[600px] z-[1] mt-0">
      <Image
        src="/bannerNavar.webp"
        alt="Wave Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="rounded-xl"
      />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-50 to-transparent rounded-b-xl"></div>
      </div>

      {/* Banner Dinámico */}
     
      <RandomAnimalsCards  />

      <div className="relative z-0 mt-10 ml-10">
        {/* <RandomMedicalCards /> */}
        <BannerPromocional />
      </div>
    </div>
  );
};

export default Home;
