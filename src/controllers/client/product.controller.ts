import { Request, Response } from "express";
import { get } from "node:http";
import { addProductToCart, getCartDetails, getProductById } from "services/client/item.service";

const getDetailProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(id);
    if (product) return res.render('client/product/detail.ejs', {
        product
    });
    return res.render('status/404.ejs', {
        message: 'Product not found'
    });

}

const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user; // Assuming user is attached to the request by authentication middleware
    if (user) {
        await addProductToCart(1, user, +id);
    }
    else {
        return res.redirect('/login');
    }
    return res.redirect(`/`);

}

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user; // Assuming user is attached to the request by authentication middleware

    if (user) {
        const cartDetails = await getCartDetails(user?.id);
        let totalPrice = 0;
        cartDetails.forEach((item) => {
            totalPrice += item.product.price * item.quantity;
        })
        return res.render('client/product/cart.ejs', {
            cartDetails,
            totalPrice
        });
    }
    else {
        return res.redirect('/login');
    }
}

export { getDetailProduct, postAddProductToCart, getCartPage }