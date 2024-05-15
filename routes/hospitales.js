/** Ruta: '/api/hospital' */

const { Router } = require('express');
const {check} = require('express-validator')
const { getHospitales, createHospitales, actualizarHospitales, borrarHospitales} = require('../Controllers/hospitales');
const { validandoJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validations-field')

const router = Router();

router.get('/',getHospitales);
router.post(
						'/',
						[
							validandoJWT,
							check('nombre','El nombre es obligatorio.').not().isEmpty(),
							// check('usuario','El usuario es obligatorio.').not().isEmpty(),
							validarCampos,
						],
						createHospitales
);

router.put( '/:id',
						[
							// validandoJWT,
							// check('nombre','El nombre es obligatorio.').not().isEmpty(),
							// check('img','la imagen es obligatorio.').isEmail(),
							// check('usuario','El usuario es obligatorio.').not().isEmpty(),
						],
						actualizarHospitales
					);

router.delete('/:id' ,borrarHospitales);

module.exports = router;