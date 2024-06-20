// pages/index.tsx
import React from "react";
import Image from "next/image";
import BannerPromocional from "@/components/admin/PromotionBaner";
import RandomAnimalsCards from "@/components/Card-Animals/RandomAnimalsCards";


const Home: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Banner Estático */}
      <div className="relative w-full h-[600px]">
        <Image
          src="/bannerNav.png"
          alt="Wave Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-xl border-4"
        />
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
