const mongoose = require('mongoose');
require('dotenv').config();


const dbConections = async ()=>{
	try {
			await mongoose.connect(process.env.URL_DB_CONECTION,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});

			console.log("DB online");

	} catch (error) {
		console.log("Error =>", error);
		throw new Error("Error al iniciar conexion con DB.");
	}
	
}

module.exports={
	dbConections
}