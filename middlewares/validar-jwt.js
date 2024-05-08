const jwt = require('jsonwebtoken');

const validandoJWT = (req, res, nex)=>{


	const x_token = req.header('x-token');
	if(!x_token){
		return res.status(401).json({
			ok: false,
			msg: "No se encontro token."
		});
	}

	try {
		
		const {uid} = jwt.verify(x_token, process.env.JWT_SECRET);
		req.uid = uid
		console.log(uid);

		nex();

	} catch (error) {

		console.log(error);
		res.status(401).json({
			ok:false,
			msg: "Token incorrecto."
		})
		
	}
	
}


module.exports = {
	validandoJWT,
}