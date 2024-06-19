import { IRefugios } from "@/interface/IRefugios";

export async function getShelterDB() { 
    try {
        const res= await fetch ("https://huellasdesperanza.onrender.com/shelters", {
            method: "GET",
            headers: {
                "Cache-Control": "no-cache" 
            }
        })
        const refugio: IRefugios[] = await res.json()
        return refugio
    } catch (error:any) {
        throw new Error(error)
    }
}

export async function getRefugio() {
    try {
        const refugioDB = await getShelterDB()
        return refugioDB
    } catch (error : any) {
        throw new Error (error)
    }
}

export async function getRefugioById(id:string) {
    try {
        const refugios = await getRefugio()
        const refugio = refugios.find((refugio) => refugio.id!.toString() === id)
            return refugio
    } catch (error: any) {
        
    }
}

