// import React, { useState } from "react";
// import { usePromotion } from "@/context/PromotionContext";

// const PromotionSettings: React.FC = () => {
//   const { setPromotion } = usePromotion();
//   const [imageSrc, setImageSrc] = useState<string>("/promo1.png");
//   const [duration, setDuration] = useState<number>(10);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setPromotion({ imageSrc, duration: duration * 24 * 60 * 60 }); // Convert days to seconds
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-6">
//       <h2 className="text-2xl font-bold mb-4">Configurar Promoción</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700">URL de la Imagen:</label>
//         <input
//           type="text"
//           value={imageSrc}
//           onChange={(e) => setImageSrc(e.target.value)}
//           className="mt-1 p-2 w-full border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Duración (días):</label>
//         <input
//           type="number"
//           value={duration}
//           onChange={(e) => setDuration(Number(e.target.value))}
//           className="mt-1 p-2 w-full border rounded"
//         />
//       </div>
//       <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//         Guardar
//       </button>
//     </form>
//   );
// };

// export default PromotionSettings;

// import React, { useState } from "react";
// import { usePromotion } from "@/context/PromotionContext";

// const PromotionSettings: React.FC = () => {
//   const { setPromotion } = usePromotion();
//   const [imageSrc, setImageSrc] = useState<string>("/promo1.webp");
//   const [days, setDays] = useState<number>(0);
//   const [hours, setHours] = useState<number>(0);
//   const [minutes, setMinutes] = useState<number>(1);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const totalDurationInSeconds = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60);
//     setPromotion({ imageSrc, duration: totalDurationInSeconds });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-6">
//       <h2 className="text-2xl font-bold mb-4">Configurar Promoción</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700">URL de la Imagen:</label>
//         <input
//           type="text"
//           value={imageSrc}
//           onChange={(e) => setImageSrc(e.target.value)}
//           className="mt-1 p-2 w-full border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Duración (días, horas, minutos):</label>
//         <div className="flex space-x-2">
//           <input
//             type="number"
//             value={days}
//             onChange={(e) => setDays(Number(e.target.value))}
//             placeholder="Días"
//             className="mt-1 p-2 w-full border rounded"
//           />
//           <input
//             type="number"
//             value={hours}
//             onChange={(e) => setHours(Number(e.target.value))}
//             placeholder="Horas"
//             className="mt-1 p-2 w-full border rounded"
//           />
//           <input
//             type="number"
//             value={minutes}
//             onChange={(e) => setMinutes(Number(e.target.value))}
//             placeholder="Minutos"
//             className="mt-1 p-2 w-full border rounded"
//           />
//         </div>
//       </div>
//       <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//         Guardar
//       </button>
//     </form>
//   );
// };

// export default PromotionSettings;
