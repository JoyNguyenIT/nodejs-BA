import { Request, Response, NextFunction } from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
        return;
    }
    else {
        next();
    };
}

const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/admin')) {
        const user = req.user
        if (user?.role?.name === 'ADMIN') {
            next();
        }
        else {
            res.render('status/403.ejs');
        }
        return;
    }

    //client routes
    next();
}

export { isAdminRole, isLoggedIn };