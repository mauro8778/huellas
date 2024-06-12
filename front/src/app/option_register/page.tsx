
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaHome } from 'react-icons/fa';


export const RegistroPage: React.FC = () => {
  return (
    <div className="mx-auto p-4 bg-gray-50 ">
      <div className="flex items-center mb-3 w-full h-20 bg-pink-600 rounded-lg p-4">
        <Image src="/LogoHuellas.svg" alt="Logo" className="w-16 h-auto sm:w-24" width={500} height={500} />
        <h1 className="ml-4 text-white text-lg sm:text-2xl border-b-2">Huellas de Esperanza</h1>
      </div>
      <div className="text-center mb-6">
        <p className="text-xl sm:text-4xl text-gray-600 font-semibold">¿Cómo deseas registrarte?</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-16 h-full">
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg w-full sm:w-[450px] h-[300px]">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <FaUser className="text-blue-600 w-10 h-10" />
          </div>
          <p className="mb-4 text-center text-sm sm:text-lg text-gray-600 flex-grow">Buscas un compañero fiel? Explora nuestra comunidad de refugios registrados y encuentra a tu nuevo mejor amigo de cuatro patas.</p>
          <Link href="/AUTH/register">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-auto w-full sm:w-auto">Registrarme como usuario</button>
          </Link>
        </div>

        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg w-full sm:w-[450px] h-[300px]">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <FaHome className="text-green-600 w-10 h-10" />
          </div>
          <p className="mb-4 text-center text-sm sm:text-lg text-gray-600 flex-grow">¿Eres un refugio que busca hogares amorosos para tus animales rescatados? Regístrate hoy y únete a nuestra misión de darle esperanza a cada huella.</p>
          <Link href="/AUTH/shelter_register">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-auto w-full sm:w-auto">Registrarme como refugio</button>
          </Link>
        </div>
      </div>
     
    </div>
  );
};

export default RegistroPage;
