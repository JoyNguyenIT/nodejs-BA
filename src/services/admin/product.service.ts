import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from "config/client"

const handleCreateProduct = async (
    name: string, price: number, detailDesc: string, shortDesc: string, factory: string, quantity: number, target: string, image: string
) => {
    const newProduct = await prisma.product.create({
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            factory: factory,
            quantity: quantity,
            target: target,
            ...(image !== undefined && { image: image })
        },
    })
    return newProduct
}

const handleUpdateProduct = async (
    id: string, name: string, price: number, detailDesc: string, shortDesc: string, factory: string, quantity: number, target: string, image: string
) => {
    const newProduct = await prisma.product.update({
        where: {
            id: +id
        },
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            factory: factory,
            quantity: quantity,
            target: target,
            ...(image !== undefined && { image: image })
        },
    })
    return newProduct
}

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: +id
        }
    })
    return product;
}

const handleDeleteProduct = async (id: string) => {
    const product = await prisma.product.delete({
        where: {
            id: +id
        }
    })
    return product;
}

export { handleCreateProduct, getAllProducts, getProductById, handleUpdateProduct, handleDeleteProduct }