import { IMascotas } from '@/interface/IMascotas';
import CardAnimals from './CardAnimals';

interface Props {
  mascotas: IMascotas[];
  updateMascota: (mascota: IMascotas) => void;
}

const ListaMascotas: React.FC<Props> = ({ mascotas, updateMascota }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
      {mascotas.map((mascota) => (
        <CardAnimals key={mascota.id} mascota={mascota} updateMascota={updateMascota} />
      ))}
    </div>
  );
};

export default ListaMascotas;
