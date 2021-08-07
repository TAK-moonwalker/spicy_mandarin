const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jc3q0.mongodb.net/SpicyMandarin?retryWrites=true&w=majority`

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: dbURL,
        collectionName: 'sessions' // See below for details
      }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 15 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));