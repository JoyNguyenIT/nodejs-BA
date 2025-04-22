// const express = require('express');
import express from "express";
import 'dotenv/config';
import webRoute from "./routes/web";

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

webRoute(app);

app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);
})