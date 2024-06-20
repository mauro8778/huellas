
// import React, { useState } from "react";
// import { RiSearchLine } from "react-icons/ri";
// import axios from "axios";
// import Modal from "@/components/modal_search/modal_search"; 
// import Image from "next/image";
// import LoadingSpinner from "@/components/LoadingSniper/LoadingSniper"; 
// import { MdOutlinePets } from "react-icons/md";


// interface SearchResult {
//   id: string;
//   name: string;
//   sexo: string;
//   breed: string;
//   species: string;
//   age: number;
//   month: string;
//   description: string;
//   pet_size: string;
//   imgUrl: string;
//   godfather: string | null;
//   isCondition: boolean;
//   isActive: boolean;
// }

// const Search: React.FC = () => {

//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSearch = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setLoading(true);

//     setError("");
//     setResults([]);
//     setIsModalOpen(true); // Abrir el modal antes de la búsqueda
//     console.log("Searching for:", searchTerm);
//     try {
//       const response = await axios.get(
//         "https://huellasdesperanza.onrender.com/search",
//         {
//           params: { q: searchTerm },
//         }
//       );
//       console.log("Response data:", response.data);
//       setResults(response.data);
//     } catch (error) {
//       console.error("Error realizando la búsqueda:", error);
//       setError("Error realizando la búsqueda");

//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="hidden lg:flex flex-col items-center  ">
//       <form onSubmit={handleSearch} className="flex w-full mb-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(event) => setSearchTerm(event.target.value)}
//           placeholder="Buscar..."
//           className="flex-grow px-2 text-gray-700 focus:outline-none rounded-l-2xl  "
//         />

//         <button
//           type="submit"
//           className="flex items-center justify-center px-4 text-white bg-gray-700 rounded-r-2xl focus:outline-none"
//         >

//           <RiSearchLine className="w-5 h-5" />
//         </button>
//       </form>
//       <div className="w-full">

//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//       <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
//         {loading ? (
//           <div className="flex items-center justify-center h-full">
//             <LoadingSpinner />
//           </div>
//         ) : results.length > 0 ? (
//           <div className="flex flex-wrap gap-4">
//             {results.map((result) => (
//               <div
//                 key={result.id}
//                 className=" flex flex-col backdrop-filter backdrop-blur bg-opacity-20 bg-gray-100 p-4 rounded-lg shadow-lg flex-shrink-0 w-64"
//               >
//                 <Image
//                   src={result.imgUrl}
//                   alt={result.name}
//                   className="w-full h-40 object-cover rounded-t-lg mb-2"
//                   width={500}
//                   height={500}
//                 />

//                 <h3 className="text-lg font-semibold mb-2">{result.name}</h3>
//                 <p className="text-gray-700">{result.description}</p>
//               </div>
//             ))}
//           </div>

//         ) : (<div>
         
//           <p className="flex items-center justify-center text-gray-700 font-bold text-2xl ">No se encontraron resultados. <span className="text-3xl ml-2" > <MdOutlinePets /> </span> </p>
//         </div>
          

//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Search;

import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import axios from "axios";
import Modal from "@/components/modal_search/modal_search";
import Image from "next/image";
import Link from 'next/link';
import LoadingSpinner from "@/components/LoadingSniper/LoadingSniper";
import { MdOutlinePets } from "react-icons/md";
import useUserRole from "@/utils/userSession";

interface SearchResult {
  id: string;
  name: string;
  sexo: string;
  breed: string;
  species: string;
  age: number;
  month: string;
  description: string;
  pet_size: string;
  imgUrl: string;
  godfather: string | null;
  isCondition: boolean;
  isActive: boolean;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = useUserRole(); 

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setIsModalOpen(true); 
    console.log("Searching for:", searchTerm);
    try {
      const response = await axios.get(
        "https://huellasdesperanza.onrender.com/search",
        {
          params: { q: searchTerm },
        }
      );
      console.log("Response data:", response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error realizando la búsqueda:", error);
      setError("Error realizando la búsqueda");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (

    
    <div className="hidden lg:flex flex-col items-center">
      <form onSubmit={handleSearch} className="flex w-full mb-4">

      {userRole !== 'Shelter' && (
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Encuentra tu mascota..."
          className="flex-grow px-2 text-gray-700 focus:outline-none rounded-l-2xl"
        />
        )}


{userRole !== 'Shelter' && (
        <button
      type="submit"
    className="flex items-center justify-center px-4 text-white bg-gray-700 rounded-r-2xl focus:outline-none"
  >
          <RiSearchLine className="w-5 h-5" />
        </button>

)}

      </form>
      <div className="w-full">
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {results.map((result) => (
              <Link key={result.id} href={`/adopta/${result.id}`}>
                <div className="flex flex-col backdrop-filter backdrop-blur bg-opacity-20 bg-gray-100 p-4 rounded-lg shadow-lg flex-shrink-0 w-64 cursor-pointer">
                  <Image
                    src={result.imgUrl}
                  alt={result.name}
                className="w-full h-40 object-cover rounded-t-lg mb-2"
              width={500}
            height={500}
          />
                  <h3 className="text-lg font-semibold mb-2">{result.name}</h3>
                  <p className="text-gray-700">{result.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <p className="flex items-center justify-center text-gray-700 font-bold text-2xl">
              No se encontraron resultados.{" "}
              <span className="text-3xl ml-2">
                {" "}
                <MdOutlinePets />{" "}
              </span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Search;


