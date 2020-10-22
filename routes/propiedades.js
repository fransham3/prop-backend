/*
    Ruta: /api/propiedades
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getPropiedades,
    crearPropiedad,
    actualizarPropiedad,
    borrarPropiedad,
    modalPropiedades
    } = require('../controllers/propiedades');

const router = Router();

router.get('/', getPropiedades);

router.post('/', 
    [
        validarJWT,
        check('titulo', 'La propiedad debe tener titulo').not().isEmpty(),
        check('tipo_oper', 'La propiedad debe tener tipo de operación').not().isEmpty(),
        check('precio', 'La propiedad debe tener precio').not().isEmpty(),
        check('desc_corta', 'La propiedad debe tener descripción corta').not().isEmpty(),
        validarCampos
    ],
    crearPropiedad);

router.put('/:id', 
    [
        validarJWT,
        check('titulo', 'La propiedad debe tener titulo').not().isEmpty(),
        check('tipo_oper', 'La propiedad debe tener tipo de operación').not().isEmpty(),
        check('precio', 'La propiedad debe tener precio').not().isEmpty(),
        check('desc_corta', 'La propiedad debe tener descripción corta').not().isEmpty(),
        validarCampos
    ], 
    actualizarPropiedad);

router.delete('/:id',
    validarJWT,
    borrarPropiedad);


router.get('/modal/:id', modalPropiedades);






module.exports = router;