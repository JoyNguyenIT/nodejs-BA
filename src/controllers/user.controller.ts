import { Request, Response } from "express";
import { getAllUsers, handleCreateUser } from "services/user.service";


const getHomepage = async (req: Request, res: Response) => {
    //get users
    const listUsers = await getAllUsers();
    return res.render('home', {
        users: listUsers
    });
}

const getCreateUser = (req: Request, res: Response) => {
    return res.render('create-user.ejs');
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;
    await handleCreateUser(fullName, email, address)
    return res.redirect("/");
}

export { getHomepage, getCreateUser, postCreateUser }