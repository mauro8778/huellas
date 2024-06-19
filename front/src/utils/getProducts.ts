import getProductsDB from "./getProductDB"


async function getProducts() {
    try {
        const productsDB = await getProductsDB()
        return productsDB
    } catch (error : any) {
        throw new Error (error)
    }
}

export default getProducts