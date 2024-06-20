// import React from 'react';

// interface FiltroRazaProps {
//   raza: string;
//   setRaza: (raza: string) => void;
//   razas: string[];
// }

// const FiltroRaza: React.FC<FiltroRazaProps> = ({ raza, setRaza, razas }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700 mb-2">Raza</label>
//     <select
//       value={raza}
//       onChange={(e) => setRaza(e.target.value)}
//       className="w-full p-2 border border-gray-300 rounded"
//     >
//       <option value="">Todas</option>
//       {razas.map((raz, index) => (
//         <option key={index} value={raz}>{raz}</option>
//       ))}
//     </select>
//   </div>
// );

// export default FiltroRaza;
