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
    borrarPropiedad
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
        
    ], 
    actualizarPropiedad);

router.delete('/:id',
    borrarPropiedad);






module.exports = router;