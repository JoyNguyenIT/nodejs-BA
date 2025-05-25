import express, { Express } from "express";
import { getHomepage, getViewUser, postCreateUser, postDeleteUser, postUpdateUser } from "controllers/user.controller";
import { getAdminCreateUser, getAdminOrderPage, getAdminUserPage, getDashBoard, getListProduct } from "controllers/admin/admin.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getDetailProduct } from "controllers/client/product.controller";
import { getAdminCreateProduct, getViewProduct, postCreateProduct, postDeleteProduct, postUpdadeProduct } from "controllers/admin/product.controller";
import initSeeds from "config/seed";
import { getLoginPage, getRegisterPage, getSuccessRedirect, postLogoutPage, postRegisterPage } from "controllers/client/auth.controller";
import passport from "passport";
import { isAdminRole, isLoggedIn } from "src/middleware/auth";


const router = express.Router();
const multer = require('multer')

const webRoute = (app: Express) => {
    initSeeds();

    //client routes
    router.get('/', getHomepage);
    router.get('/product/:id', getDetailProduct);
    router.get('/login', getLoginPage);
    router.get('/success-redirect', getSuccessRedirect);
    router.get('/register', getRegisterPage);
    router.post('/register', postRegisterPage);
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true,
    }));
    router.post('/logout', postLogoutPage);


    //admin routes

    router.get('/admin', getDashBoard);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/user/create', getAdminCreateUser);
    router.get('/admin/order', getAdminOrderPage);
    router.post('/admin/delete-user/:id', postDeleteUser);
    router.post('/admin/update-user', fileUploadMiddleware('avatar'), postUpdateUser);
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUser);
    router.get('/admin/view-user/:id', getViewUser);

    //product routes
    router.get('/admin/product', getListProduct);
    router.get('/admin/product/create', getAdminCreateProduct);
    router.post('/admin/product/create', fileUploadMiddleware('image', 'images/product'), postCreateProduct);
    router.get('/admin/view-product/:id', getViewProduct);
    router.post('/admin/update-product/', fileUploadMiddleware('image', 'images/product'), postUpdadeProduct);
    router.post('/admin/delete-product/:id', postDeleteProduct);


    app.use('/', isAdminRole, router);
}

export default webRoute


