// import express from 'express'; 
require('dotenv').config();

const express = require('express');
const { dbConections }  =  require('./database/config')
const cors = require('cors');

const app = express();

app.use(cors());

// lectura y parseo del body
app.use(express.json());

dbConections();


// pass: sMuchjwn2iM20uGo - tTTR3kBYIUml4wrD
// user: mean_user - sinedindnd171
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, ()=>{
	console.log('OK');
})