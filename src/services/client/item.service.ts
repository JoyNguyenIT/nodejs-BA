import { prisma } from "config/client";

const getProductsHomepage = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: +id
        }
    });
    return product;
}

export { getProductsHomepage, getProductById }