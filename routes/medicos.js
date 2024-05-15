const { Router } = require('express');
const {check} = require('express-validator');
const { getMedicos, createMedicos, actualizarMedicos, borrarMedicos } = require('../Controllers/medicos');
const { validarCampos } = require('../middlewares/validations-field');
const { validandoJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',getMedicos);

router.post(
						'/',
						[],
						createMedicos
);

router.put( '/:id',
						[],
						actualizarMedicos
					);

router.delete('/:id', borrarMedicos);

module.exports = router;