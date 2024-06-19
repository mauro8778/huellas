import getProducts from "./getProducts"

async function getProductById(id:string) {
    try {
        const products = await getProducts()
        const product = products.find((product : any) => product.id!.toString() === id)
            return product
    } catch (error: any) {
        
    }
}

export default getProductById