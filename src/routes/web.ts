import express, { Express } from "express";
import { getCreateUser, getHomepage, getViewUser, postCreateUser, postDeleteUser, postUpdateUser } from "controllers/user.controller";
import { getAdminCreateUser, getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoard } from "controllers/admin/admin.controller";
import fileUploadMiddleware from "src/middleware/multer";

const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const webRoute = (app: Express) => {
    router.get('/', getHomepage);

    router.get('/create-user', getCreateUser);

    //admin routes

    router.get('/admin', getDashBoard);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/user/create', getAdminCreateUser);
    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/order', getAdminOrderPage);
    router.post('/admin/delete-user/:id', postDeleteUser);
    router.post('/admin/update-user', fileUploadMiddleware('avatar'), postUpdateUser);
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUser);
    router.get('/admin/view-user/:id', getViewUser);


    app.use('/', router);

}

export default webRoute


