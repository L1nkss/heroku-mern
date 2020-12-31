// const express, { Application, } = require("express");
import express, { Application, Request, Response, NextFunction } from 'express';
const app: Application = express();
const path = require("path");
const dotenv = require('dotenv');
const port: number = parseInt(`${process.env.PORT}`, 10) || 3001; // исправляем ошибку TS, если PORT - строка
const root = path.join(__dirname, "../../client/build");
const mongoose = require('mongoose');
const routes = require('./routes/index');

dotenv.config();

// Define middleware here
const cookieParser = require('cookie-parser')
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Routes
app.use(routes)

app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(root));
  }

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('MongoDB is connected')
    } catch (e) {
        console.log("Server Error", e);
        process.exit();
    }
}

start();

app.listen(port, () => {
    console.log('server starts')
})