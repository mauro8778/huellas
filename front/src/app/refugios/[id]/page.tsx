'use client'
import { useState, useEffect } from 'react';
import { RefugioDetail } from '@/components/RefugioDetail/RefugioDetail';
import { IRefugios } from '@/interface/IRefugios';
import { getRefugioById } from '@/utils/refugios';
import ShelterGeolocation from '@/components/Maps/ShelterGeolocation'; // Asegúrate de que la ruta de importación sea correcta

const DetailRefugio = ({ params }: { params: { id: string } }) => {
    const [refugio, setRefugio] = useState<IRefugios | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRefugio = async () => {
            try {
                const data = await getRefugioById(params.id);
                if (data) {
                    setRefugio(data);
                } else {
                    setError('Refugio no encontrado');
                }
            } catch (error) {
                setError('Error al obtener el refugio');
                console.error('Error en fetchRefugio:', error);
            }
        };

        fetchRefugio();
    }, [params.id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!refugio) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <RefugioDetail {...refugio} />
            <ShelterGeolocation shelterId={params.id} /> {/* Renderiza ShelterGeolocation y pásale el ID */}
        </div>
    );
};

export default DetailRefugio;
