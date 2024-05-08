const { Router } = require('express');
const {check} = require('express-validator')
const { getUsuarios, createUsuario, actualizarUsuario, borrarUsuario } = require('../Controllers/usuarios');
const { validandoJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validations-field')

const router = Router();

router.get('/',validandoJWT,getUsuarios);
router.post(
						'/',
						[
							validandoJWT,
							check('nombre','El nombre es obligatorio.').not().isEmpty(),
							check('password','El password es obligatorio.').not().isEmpty(),
							check('email','El email es obligatorio y debe ser un email valido.').isEmail(),
							validarCampos,
						],
						createUsuario
);

router.put( '/:id',
						[
							validandoJWT,
							check('nombre','El nombre es obligatorio.').not().isEmpty(),
							check('email','El email es obligatorio y debe ser un email valido.').isEmail(),
							check('role','El role es obligatorio.').not().isEmpty(),
						],
						actualizarUsuario
					);

router.delete('/:id', validandoJWT ,borrarUsuario);

module.exports = router;