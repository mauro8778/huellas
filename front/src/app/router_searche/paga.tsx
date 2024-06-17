// 'use client';
// import React, { useContext } from 'react';
// import { SearchContext } from '@/context/SearchContext';
// import Image from 'next/image';

// interface SearchResult {
//   id: string;
//   name: string;
//   description: string;
//   imgUrl: string | undefined;
// }

// const SearchResults: React.FC = () => {
//   const { results } = useContext(SearchContext) || {};

//   if (!results) {
//     return null;
//   }

//   return (
//     <div className="w-full">
//       {results.length > 0 ? (
//         <ul className="list-disc pl-5">
//           {results.map((result: SearchResult) => (
//             <li key={result.id} className="mb-2">
//               <div>
//                 <h3>{result.name}</h3>
//                 <p>{result.description}</p>
//                 <Image 
//                   src={result.imgUrl || '/default-image.jpg'} 
//                   alt={typeof result.name === 'string' ? result.name : 'Image'} 
//                   className="w-16 h-16"
//                   width={64}
//                   height={64}
//                 />
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-700">No se encontraron resultados.</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;
