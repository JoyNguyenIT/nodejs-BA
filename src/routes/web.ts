import express, { Express } from "express";
import { getCreateUser, getHomepage, getViewUser, postCreateUser, postDeleteUser, postUpdateUser } from "controllers/user.controller";

const router = express.Router();


const webRoute = (app: Express) => {
    router.get('/', getHomepage);

    router.get('/create-user', getCreateUser);

    router.post('/handle-create-user', postCreateUser);
    router.post('/handle-delete-user/:id', postDeleteUser);
    router.get('/handle-view-user/:id', getViewUser);
    router.post('/handle-update-user', postUpdateUser);

    app.use('/', router);
}

export default webRoute


