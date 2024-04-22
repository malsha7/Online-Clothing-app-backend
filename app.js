//load variables from env
require('dotenv').config();
 
const bodyParser = require('body-parser');

//import mongoose instant
const mongoose= require ('./config/dbConfig')

const userRoutes= require ('./routes/userRoutes')

const authRoutes  = require ('./routes/authRoutes')

const productRoutes  = require ('./routes/productRoutes')


const express = require('express')
const app = express()
app.use(bodyParser.json());

const http = require('http').Server(app)

app.use(express.json())

app.use('/auths', authRoutes);
app.use('/api', userRoutes);
app.use('/api',productRoutes);


app.listen(8000, () => console.log('server started'))





