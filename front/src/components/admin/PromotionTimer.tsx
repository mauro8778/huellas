// 'use client';
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { usePromotion } from "@/context/PromotionContext";

// const PromotionTimer: React.FC = () => {
//   const { currentPromotion } = usePromotion();
//   const [timeLeft, setTimeLeft] = useState<number>(currentPromotion.duration);

//   useEffect(() => {
//     setTimeLeft(currentPromotion.duration);
//   }, [currentPromotion]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     if (timeLeft <= 0) {
//       setTimeLeft(0); // Stop the timer when it reaches zero
//     }

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   return (
//     <div className="relative w-full h-[300px] my-10">
//       <Image
//         src={currentPromotion.imageSrc}
//         alt="Promotion Image"
//         layout="fill"
//         objectFit="cover"
//         objectPosition="center"
//         className="rounded-xl border-4"
//       />
//       <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded">
//         Time left: {timeLeft}s
//       </div>
//     </div>
//   );
// };

// export default PromotionTimer;

// 'use client';
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { usePromotion } from "@/context/PromotionContext";

// const alternatePromotions = [
//   { imageSrc: "/promo2.webp", duration: 60 },
//   // agregar más promociones si es necesario
// ];

// const PromotionTimer: React.FC = () => {
//   const { currentPromotion, stopPromotion, isPromotionActive } = usePromotion();
//   const [timeLeft, setTimeLeft] = useState<number>(currentPromotion.duration);
//   const [alternateIndex, setAlternateIndex] = useState<number>(0);

//   useEffect(() => {
//     setTimeLeft(currentPromotion.duration);
//   }, [currentPromotion]);

//   useEffect(() => {
//     if (!isPromotionActive) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     if (timeLeft <= 0 && isPromotionActive) {
//       if (alternateIndex < alternatePromotions.length - 1) {
//         setAlternateIndex((prevIndex) => prevIndex + 1);
//       } else {
//         stopPromotion();
//       }
//       setTimeLeft(alternatePromotions[alternateIndex].duration);
//     }

//     return () => clearInterval(timer);
//   }, [timeLeft, alternateIndex, isPromotionActive]);

//   if (!isPromotionActive) {
//     return null;
//   }

//   const currentImageSrc = timeLeft > 0 ? currentPromotion.imageSrc : alternatePromotions[alternateIndex].imageSrc;

//   return (
//     <div className="relative w-full h-[300px] my-10">
//       <Image
//         src={currentImageSrc}
//         alt="Promotion Image"
//         layout="fill"
//         objectFit="cover"
//         objectPosition="center"
//         className="rounded-xl border-4"
//       />
//       <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded">
//         Time left: {timeLeft}s
//       </div>
//       <button onClick={stopPromotion} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded">
//         Detener Promoción
//       </button>
//     </div>
//   );
// };

// export default PromotionTimer;
