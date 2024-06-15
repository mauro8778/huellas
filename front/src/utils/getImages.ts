// utils/getProductById.ts
import getProducts from "./getProducts"

async function getImages(id: string) {
    try {
        const products = await getProducts();
        const product = products.find((product: any) => product.id!.toString() === id);
        return product;
    } catch (error: any) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default getImages;
