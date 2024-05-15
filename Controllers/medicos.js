const Medico = require('../models/medicos');
const { response } = require('express');

const getMedicos = async (req, res=response)=>{

	const medico = new Medico();

	res.status(200).json({
		ok: true,
		msg: "getMedicos",
		uid: req.uid
	});
}

const createMedicos = (req,res=response)=>{

	// const hospitales = new Hospital();

	res.json({
		ok: true,
		msg: "createMedicos",
		// uid: req.uid
	});

}

const actualizarMedicos = (req, res=response)=>{

	const id = req.params.id
	res.json({
		ok: true,
		msg: "actualizarMedicos.",
		id
		// uid: req.uid
	});
}

const borrarMedicos = (req, res=response)=>{

	res.json({
		ok: true,
		msg: "borrarMedicos.",
		// uid: req.uid
	});
}

module.exports = {
	getMedicos, createMedicos, actualizarMedicos, borrarMedicos
}