/*
    ruta: api/uploads
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.use(expressFileUpload());


router.put('/propiedades/:id', validarJWT, fileUpload);
router.get('/propiedades/:img', retornaImagen);


module.exports = router;