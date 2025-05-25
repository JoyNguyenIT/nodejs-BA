/// <reference path="./types/global.d.ts" />

import express from "express";
import 'dotenv/config';
import webRoute from "./routes/web";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";
import { prisma } from "config/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static file
app.use(express.static('public'));

//config session
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000 // ms
        },
        secret: 'a santa at nasa',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 1 * 24 * 60 * 60 * 1000,  //ms
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);

//config passport
app.use(passport.initialize());
app.use(passport.session());
configPassportLocal();

//config global middleware
app.use((req, res, next) => {
    // Make `user` and `authenticated` available in templates
    res.locals.user = req.user || null;
    next()
})

// webroute
webRoute(app);

//404 not found
app.use(function (req, res) {
    res.render('status/404.ejs');
});


app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);
})

