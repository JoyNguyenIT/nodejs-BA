import initSeeds from "config/seed";
import { Request, Response } from "express";
import { getAllUsers, getUserById, handleCreateUser, handleDeleteUser, handleUpdateUser } from "services/user.service";


const getHomepage = async (req: Request, res: Response) => {
    //get users
    await initSeeds()
    const listUsers = await getAllUsers();
    return res.render('home', {
        users: listUsers
    });
}

const getCreateUser = (req: Request, res: Response) => {
    return res.render('create-user.ejs');
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, password, address, phone, accountType, avatar } = req.body;
    // const newUser = await handleCreateUser(fullName, email, address)
    return res.redirect("/");
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id)
    return res.redirect("/");
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id)
    return res.render('view-user.ejs', {
        user: user
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, email, address } = req.body;
    const userupdate = await handleUpdateUser(id, fullName, email, address)
    return res.redirect("/");
}

export { getHomepage, getCreateUser, postCreateUser, postDeleteUser, getViewUser, postUpdateUser }