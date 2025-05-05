import express, { Express } from "express";
import { getCreateUser, getHomepage, getViewUser, postCreateUser, postDeleteUser, postUpdateUser } from "controllers/user.controller";
import { getAdminCreateUser, getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoard } from "controllers/admin/admin.controller";

const router = express.Router();


const webRoute = (app: Express) => {
    router.get('/', getHomepage);

    router.get('/create-user', getCreateUser);


    router.post('/handle-delete-user/:id', postDeleteUser);
    router.get('/handle-view-user/:id', getViewUser);
    router.post('/handle-update-user', postUpdateUser);


    router.get('/admin', getDashBoard);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/user/create', getAdminCreateUser);
    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/order', getAdminOrderPage);
    router.post('/admin/handle-create-user', postCreateUser);
    app.use('/', router);
}

export default webRoute


