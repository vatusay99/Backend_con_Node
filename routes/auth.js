
const { Router } = require('express');
const {check} = require('express-validator');
const { loguinAuth } = require('../Controllers/auth.controller');
const { validarCampos } = require('../middlewares/validations-field');

const router = Router();

router.post('/', 
						[
							check('password','El password es obligatorio.').not().isEmpty(),
							check('email','El email es obligatorio y debe ser un email valido.').isEmail(),
							validarCampos
						],
						loguinAuth
);


module.exports = router;