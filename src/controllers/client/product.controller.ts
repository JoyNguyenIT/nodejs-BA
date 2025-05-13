import { Request, Response } from "express";

const getDetailProduct = async (req: Request, res: Response) => {
    return res.render('client/product/detail.ejs');
}

export { getDetailProduct }