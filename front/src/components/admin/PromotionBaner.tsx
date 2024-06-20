// /* eslint-disable @next/next/no-img-element */
// // components/BannerPromocional.tsx
// 'use client';
// import React, { useEffect, useState } from "react";

// interface BannerData {
//   imageSrc: string;
//   altText: string;
//   endDate: string;
// }

// const BannerPromocional: React.FC = () => {
//   const [bannerData, setBannerData] = useState<BannerData | null>(null);
//   const [isBannerActive, setIsBannerActive] = useState<boolean>(false);
//   const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

//   useEffect(() => {
//     const data = localStorage.getItem("bannerData");
//     if (data) {
//       const parsedData: BannerData = JSON.parse(data);
//       const endDate = new Date(parsedData.endDate);
//       if (endDate > new Date()) {
//         setBannerData(parsedData);
//         setIsBannerActive(true);
//       } else {
//         localStorage.removeItem("bannerData");
//       }
//     }
//   }, []);

// //   useEffect(() => {
// //     if (bannerData) {
// //       const timer = setTimeout(() => {
// //         localStorage.removeItem("bannerData");
// //         setIsBannerActive(false);
// //       }, new Date(bannerData.endDate).getTime() - new Date().getTime());

// //       return () => clearTimeout(timer);
// //     }
// //   }, [bannerData]);
// useEffect(() => {
//     if (bannerData) {
//       const endDate = new Date(bannerData.endDate).getTime();
  
//       const updateRemainingTime = () => {
//         const now = new Date().getTime();
//         const difference = endDate - now;
        
//         if (difference <= 0) {
//           localStorage.removeItem("bannerData");
//           setIsBannerActive(false);
//           clearInterval(timer);
//         } else {
//           setTimeRemaining(difference);
//         }
//       };
  
//       const timer = setInterval(updateRemainingTime, 1000);
//       updateRemainingTime(); // Initial call to set the correct initial state
  
//       return () => clearInterval(timer);
//     }
//   }, [bannerData]);

//   const formatTimeRemaining = (milliseconds: number) => {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const days = Math.floor(totalSeconds / (60 * 60 * 24));
//     const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
//     const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
//     const seconds = totalSeconds % 60;
  
//     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };
  
  

//   if (!isBannerActive || !bannerData) return null;

//   return (
//     <div className="relative w-full h-[350px]">
//       <img
//         src={bannerData.imageSrc}
//         alt={bannerData.altText}
//         className="w-full h-full object-cover rounded-xl border-4"
//       />
//       <div className="absolute bottom-4 left-4 bg-black bg-opacity-20 text-white p-4 rounded-xl  justify-center text-center   ">
//         {/* <p>{bannerData.altText}</p>
//         <p>Válido hasta: {new Date(bannerData.endDate).toLocaleString()}</p> */}

// <p>{bannerData.altText}</p>
//   <p>Válido hasta: {new Date(bannerData.endDate).toLocaleDateString('es-AR', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
//   })}</p>
//   {timeRemaining !== null && (
//     <p>Tiempo restante: {formatTimeRemaining(timeRemaining)}</p>
//   )}

//       </div>
//     </div>
//   );
// };

// export default BannerPromocional;
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
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

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
      const endDate = new Date(bannerData.endDate).getTime();

      const updateRemainingTime = () => {
        const now = new Date().getTime();
        const difference = endDate - now;
        
        if (difference <= 0) {
          localStorage.removeItem("bannerData");
          setIsBannerActive(false);
          clearInterval(timer);
        } else {
          setTimeRemaining(difference);
        }
      };

      const timer = setInterval(updateRemainingTime, 1000);
      updateRemainingTime(); // Initial call to set the correct initial state

      return () => clearInterval(timer);
    }
  }, [bannerData]);

  const formatTimeRemaining = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  if (!isBannerActive || !bannerData) return null;

  return (
    <div className="relative w-full h-[600px]">
      <img
        src={bannerData.imageSrc}
        alt={bannerData.altText}
        className="w-full h-full object-cover rounded-xl border-4"
      />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-20 ml-[1250px] text-white p-4 rounded-xl justify-center text-center">
        <p>{bannerData.altText}</p>
        <p>Válido hasta: {new Date(bannerData.endDate).toLocaleDateString('es-AR', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        })}</p>
        {timeRemaining !== null && (
          <p> {formatTimeRemaining(timeRemaining)}</p>
        )}
      </div>
    </div>
  );
};

export default BannerPromocional;
