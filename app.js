const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connecttoDB = require('./config/db');
const cookieparser = require('cookie-parser');
const homerouter = require('./routes/homeroutes')


connecttoDB();

app.set ('view engine', 'ejs');
app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter)

app.use('/', homerouter )

app.listen(3000)