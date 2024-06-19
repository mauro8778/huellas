/* eslint-disable @next/next/no-img-element */
// components/BannerPromocional.tsx
'use client';
import React, { useEffect, useState } from "react";

interface BannerData {
  imageSrc: string;
  altText: string;
  endDate: string;
}

const BannerPromocional: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [isBannerActive, setIsBannerActive] = useState<boolean>(false);

  useEffect(() => {
    const data = localStorage.getItem("bannerData");
    if (data) {
      const parsedData: BannerData = JSON.parse(data);
      const endDate = new Date(parsedData.endDate);
      if (endDate > new Date()) {
        setBannerData(parsedData);
        setIsBannerActive(true);
      } else {
        localStorage.removeItem("bannerData");
      }
    }
  }, []);

  useEffect(() => {
    if (bannerData) {
      const timer = setTimeout(() => {
        localStorage.removeItem("bannerData");
        setIsBannerActive(false);
      }, new Date(bannerData.endDate).getTime() - new Date().getTime());

      return () => clearTimeout(timer);
    }
  }, [bannerData]);

  if (!isBannerActive || !bannerData) return null;

  return (
    <div className="relative w-full h-[600px]">
      <img
        src={bannerData.imageSrc}
        alt={bannerData.altText}
        className="w-full h-full object-cover rounded-xl border-4"
      />
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 p-4 rounded-lg">
        <p>{bannerData.altText}</p>
        <p>Válido hasta: {new Date(bannerData.endDate).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default BannerPromocional;
