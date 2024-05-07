// import express from 'express'; 
require('dotenv').config();

const express = require('express');
const { dbConections }  =  require('./database/config')
const cors = require('cors');

const app = express();

dbConections();

app.use(cors());

// pass: sMuchjwn2iM20uGo - tTTR3kBYIUml4wrD
// user: mean_user - sinedindnd171
app.get('/', (req, res)=>{
	res.status(202).json({
		status: 200,
		msg: 'Ok petición ralizada con exito'
	});
})

app.listen(process.env.PORT, ()=>{
	console.log('OK');
})