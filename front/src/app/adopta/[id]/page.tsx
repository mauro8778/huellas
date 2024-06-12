'use client'


// import { useEffect, useState } from 'react';
// import { MascotaDetail } from "@/components/MascotaDetail/MascotaDetail";
// import { IMascotas } from "@/interface/IMascotas";

// const DetailAnimals = ({ params }: { params: { id: string } }) => {
//     const [mascota, setMascota] = useState<IMascotas | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`https://huellasdesperanza.onrender.com/pets/${params.id}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }
//                 const data = await response.json();
//                 console.log("Data:", data); 
//                 setMascota(data[0]); 
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setMascota(null);
//             }
//         };

//         fetchData();
//     }, [params.id]);

//     if (!mascota) {
//         return <div>Mascota no encontrada</div>;
//     }

//     return <MascotaDetail {...mascota} />;
// };

// export default DetailAnimals;

import { useEffect, useState } from 'react';
import { MascotaDetail } from "@/components/MascotaDetail/MascotaDetail";
import { IMascotas } from "@/interface/IMascotas";

const DetailAnimals = ({ params }: { params: { id: string } }) => {
    const [mascota, setMascota] = useState<IMascotas | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://huellasdesperanza.onrender.com/pets/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log("Data:", data); 
                setMascota(data[0]); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setMascota(null);
            }
        };

        fetchData();
    }, [params.id]);

    if (!mascota) {
        return <div>Mascota no encontrada</div>;
    }

    return <MascotaDetail {...mascota} petId={params.id} />;
};

export default DetailAnimals;
