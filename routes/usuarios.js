
/*
    Ruta: /api/usuarios
*/


const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios'); 
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo electrónico es obligatorio').isEmail(),
        validarCampos,      //siempre debe ser el ultimo despues de los checks
    ],
    crearUsuario);

router.put('/:id', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo electrónico es obligatorio').isEmail(),
        validarCampos,      //siempre debe ser el ultimo despues de los checks
    ], 
    actualizarUsuario);

router.delete('/:id',
        validarJWT,
        borrarUsuario);






module.exports = router;