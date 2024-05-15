const Hospital = require('../models/hospital');
const { response } = require('express');

const getHospitales = async (req, res=response)=>{

	const hospitales = new Hospital();

	res.status(200).json({
		ok: true,
		msg: "Total Hospitales",
		uid: req.uid
	});
}

const createHospitales = (req,res=response)=>{

	const hospital = new Hospital(req.body);

	try {


		res.json({
			ok: true,
			msg: "Hospital creado correctamente",
			// uid: req.uid
		});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Upps.. contacte al administrador",
		});
	}
}

const actualizarHospitales = (req, res=response)=>{

	const id = req.params.id
	res.json({
		ok: true,
		msg: "Hospital actualizado correctamente.",
		id
		// uid: req.uid
	});
}

const borrarHospitales = (req, res=response)=>{

	res.json({
		ok: true,
		msg: "Hospital eliminado correctamente.",
		// uid: req.uid
	});
}

module.exports = {
	getHospitales,
	createHospitales,
	actualizarHospitales,
	borrarHospitales
}