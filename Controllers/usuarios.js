const Usuario 			= require('../models/usuario');
const { response } 	= require('express');
const bcrypt 				= require('bcryptjs');
const { generarJWT  } = require('../helpers/jwt');

const getUsuarios = async (req, res)=>{
	const usuarios = await Usuario.find();
	
	res.json({
		ok: true,
		usuarios,
		uid: req.uid
	});
};

const createUsuario = async (req, res= response)=>{

	// console.log(req.body);
	const { nombre, email, password } = req.body;

	try {
		const exitsEmail = await Usuario.findOne({email});
		if(exitsEmail)
		{
			return res.status(400).json({
				ok: false,
				msg: "El correo ya esta registrado."
			})
		}
		const usuario = new Usuario(req.body);
		
		// encriptar password
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);
		
		await usuario.save();

		// generar JWT 
		const token = await generarJWT(usuario.id);


		res.json({
			ok: true,
			usuario,
			token
		})


	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'error inesperado...!'
		});	
	}
	
};

const actualizarUsuario = async (req, res= response)=>{

	const uid = req.params.id;
	try {
		
		//const { nombre, email, role } = req.body;
		const usuarioDB = await Usuario.findById(uid);
		
		if(!usuarioDB)
		{
			return res.status(404).json({
				ok: false,
				msg: "No se encontro usaurio con este Id."
			});
		}

		// validar token y comprobar si es el usuario correcto.

		const {password, google, email, ...campos} = req.body;
		if(usuarioDB.email !== email)
		{
			const existeEmail = Usuario.findOne({email: email});
			if(existeEmail)
			{
				return res.status(400).json({
					ok: false,
					msg: "Ya existe un usuario con este Email."
				});
			}
		}

		campos.email = email;
		const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});

		res.json({
			ok: true,
			msg: 'Usuario actualizado con exito',
			usuario: usuarioActualizado
		});

	} catch (error) {

		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Se produjo un fallo actualizando en usuario..!'
		});

	}

}

const borrarUsuario = async (req, res=response)=>{
	const uid = req.params.id;

	try {

		const usuarioDB = await Usuario.findById(uid);
		
		if(!usuarioDB)
		{
			return res.status(401).json({
				ok: false,
				msg: "No se encontro usaurio con este Id."
			});
		}

		await Usuario.findByIdAndDelete(uid);

		res.status(200).json({
			ok:true,
			msg:'Usuario Eliminado',
			uid
		});
		
	} catch (error) {
		console.log(error);
		res.status(404).json({
			ok:false,
			msg:'algo salio mal... intente mas tarde.',
		});
	}

}

module.exports = 
{ getUsuarios, 
	createUsuario, 
	actualizarUsuario ,
	borrarUsuario
}