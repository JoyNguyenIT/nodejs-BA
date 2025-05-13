import { Request, Response } from "express"
import { getAllProducts } from "services/admin/product.service";
import { getAllRoles, getAllUsers } from "services/user.service";

const getDashBoard = async (req: Request, res: Response) => {
    return res.render("admin/dashboard/show.ejs")
}

const getAdminUserPage = async (req: Request, res: Response) => {

    //get users
    const listUsers = await getAllUsers();
    return res.render('admin/user/show.ejs', {
        users: listUsers
    });

}

const getAdminCreateUser = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render('admin/user/create.ejs', {
        roles
    });
}

const getAdminOrderPage = async (req: Request, res: Response) => {
    return res.render("admin/order/show.ejs")
}

const getListProduct = async (req: Request, res: Response) => {
    const products = await getAllProducts();
    return res.render('admin/product/show.ejs', {
        products
    });
}



export { getDashBoard, getAdminUserPage, getAdminOrderPage, getAdminCreateUser, getListProduct }