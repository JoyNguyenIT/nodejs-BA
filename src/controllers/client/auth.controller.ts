import { Request, Response } from "express";
import { handleRegisterUser } from "services/client/auth.service";
import { RegisterSchema, TRegiserSchema } from "src/validation/register.schema";
import 'express-session';

declare module 'express-session' {
    interface SessionData {
        messages?: string[];
    }
}

const getLoginPage = (req: Request, res: Response) => {
    const { messages } = req.session;
    return res.render('client/auth/login.ejs',
        {
            messages: messages || [],
        }
    );
}

const getRegisterPage = (req: Request, res: Response) => {
    return res.render('client/auth/register.ejs', {
        errors: [],
    });
}

const postRegisterPage = async (req: Request, res: Response) => {
    const { username, password, fullName, cfpassword } = req.body as TRegiserSchema;
    const validateRegister = await RegisterSchema.safeParseAsync(req.body);
    if (!(validateRegister).success) {
        const errorsZod = (validateRegister).error.issues;
        const errorIssue = errorsZod?.map((error) => `${error.path[0]}: ${error.message}`);
        return res.render('client/auth/register.ejs', {
            errors: errorIssue,
        });
    }
    const newUser = await handleRegisterUser(
        fullName, username, password
    )
    return res.redirect('/login',);

}

const getSuccessRedirect = (req: Request, res: Response) => {
    const user = req.user
    if (user?.role?.name === 'ADMIN') {
        return res.redirect('/admin');
    }
    else {
        return res.redirect('/');
    }
}

const postLogoutPage = (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        return res.redirect('/');
    });
}

export { getLoginPage, getRegisterPage, postRegisterPage, getSuccessRedirect, postLogoutPage }