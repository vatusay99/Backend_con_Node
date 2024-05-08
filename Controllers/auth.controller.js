const Usuario 			= require('../models/usuario');
const { response } 	= require('express');
const bcrypt 				= require('bcryptjs');
const { generarJWT  } = require('../helpers/jwt')

const loguinAuth = async (req, res= response)=>{
	const { email, password } = req.body;

	try {

		const usuarioDB = await Usuario.findOne({email});

		if(!usuarioDB)
		{
			return res.status(404).json({
				ok: false,
				msg: 'El Email no se encontro, validar credenciales.',
			});
		}

		const validPassword = await bcrypt.compare( password, usuarioDB.password);
		// console.log(validPassword);
		if(!validPassword){
			return res.status(404).json({
				ok: false,
				msg: 'No es posible validar credenciales.',
			});
		}

		// generar JWT 
		const token = await generarJWT(usuarioDB.id);

		res.status(200).json({
			ok: true,
			msg: 'Usuario y pass correctos.',
			token
		});


	} catch (error) {


		console.log(error);
		res.status(417).json({
			ok:false,
			msg: 'Algo salio mal...!'
		});


	}
}

module.exports = {
	loguinAuth,
}