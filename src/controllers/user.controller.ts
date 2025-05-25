import { prisma } from "config/client";
import { Request, Response } from "express";
import { getProductsHomepage } from "services/client/item.service";
import { getAllUsers, getUserById, handleCreateUser, handleDeleteUser, handleUpdateUser } from "services/user.service";


const getHomepage = async (req: Request, res: Response) => {
    const products = await getProductsHomepage();
    return res.render('client/home/show.ejs',
        {
            products
        }
    );
}


const getCreateUser = (req: Request, res: Response) => {
    return res.render('create-user.ejs');
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, password, address, phone, role } = req.body;

    const avatar = req.file?.filename || undefined; // Handle file upload
    const newUser = await handleCreateUser(fullName, username, password, address, phone, avatar, role)
    return res.redirect("/admin/user");
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id)
    return res.redirect("/admin/user");
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const roles = await prisma.role.findMany()
    const user = await getUserById(id)
    return res.render('admin/user/detail.ejs', {
        user: user,
        roles: roles
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, phone, address, role } = req.body;
    const avatar = req.file?.filename || undefined; // Handle file upload
    await handleUpdateUser(id, fullName, phone, address, role, avatar)
    return res.redirect("/admin/user");
}





export { getHomepage, getCreateUser, postCreateUser, postDeleteUser, getViewUser, postUpdateUser, }