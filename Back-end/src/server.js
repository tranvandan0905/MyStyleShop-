require('dotenv').config()
const cors = require("cors");
const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express()
const port = 5000
const hosname = process.env.HOST_NAME
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const APIbrouter = require('./routes/api')
const connection = require('./config/database')
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET, POST, PUT, DELETE",
        allowedHeaders: "Content-Type, Authorization",
        credentials: true,
        cookie: { secure: false }
    })
);

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use('/v1/api', APIbrouter);

(async () => {
    try {
        await connection();
    }
    catch (error) {
        console.log(">> error", error)
    }
})()
app.listen(port, hosname, () => {
    console.log(`Example app listening on port ${port}`)
})

