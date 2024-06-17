import { RefugioDetail } from "@/components/RefugioDetail/RefugioDetail";
import { IRefugios } from "@/interface/IRefugios";
import { getRefugioById } from "@/utils/refugios";


const DetailRefugio = async ({ params }: { params: { id: string } }) => {
    const refugio = await getRefugioById(params.id);

    if (!refugio) {
        return <div>Refugio no encontrado</div>;
    }

    const mascotaProps: IRefugios = {
        id: refugio.id,
        shelter_name: refugio.shelter_name,
        name: refugio.name,
        description: refugio.description,
        imgUrl: refugio.imgUrl,
        zona: refugio.zona,
        location: refugio.location,
        email: refugio.email,
        phone: refugio.phone,
        pets: refugio.pets,

        
    };
    

    return <RefugioDetail {...mascotaProps} />;
    
}

export default DetailRefugio;
