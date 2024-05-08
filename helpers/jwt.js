const jwt = require('jsonwebtoken');

const generarJWT = (uid)=>{

	return new Promise((resolve, reject)=>{

		const payload= {
			uid,
			name: "",
			comida:"Ensalada"
		}
	
		jwt.sign( payload, process.env.JWT_SECRET, {
			expiresIn: '12h',
	
		}, (err, token)=>{
				if(err)
				{
					console.log(err);
					reject('No se genero el JWT.');
				}else{
					resolve(token);
				}
		});

	})
	

}

module.exports = {
	generarJWT,
}