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

const getCartDetails = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: userId,
        }
    })

    if (cart) {
        const cartDetails = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true
            }
        });
        return cartDetails;
    }
    return [];
}

const addProductToCart = async (quantity: number, user: Express.User, productId: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id,
        }
    })

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    if (cart) {
        // Update existing cart item

        //update the sum of the cart
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })

        //update the cart details
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                cartId: cart.id,
                productId: productId,
                quantity: quantity,
                price: product?.price ?? 0
            }
        })

    }
    else {
        // Create a new cart and add the product
        const newCart = await prisma.cart.create({
            data: {
                userId: user.id,
                sum: quantity,
                cartDetails: {
                    create: {
                        productId: productId,
                        quantity: quantity,
                        price: product?.price || 0,
                    }
                }

            }
        });
    }
}

export { getProductsHomepage, getProductById, addProductToCart, getCartDetails }