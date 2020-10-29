/*
    ruta: api/upload
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, 
        retornaImagen, 
        subirImagen, 
        cargarImagen, 
        eliminarImagen, 
        cargarImgById, 
        cargarImgByPropiedad,
        cargarPortada} = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');
const { route } = require('./propiedades');

const router = Router();



router.use(expressFileUpload());

router.get('/', cargarImagen);

router.get('/:id', cargarImgById);

router.get('/ver/:pID', cargarImgByPropiedad);

router.get('/portada/', cargarPortada);

router.post('/add/:pID', subirImagen);

router.delete('/delete/:photo_id', eliminarImagen);


// router.put('/propiedades/:id', validarJWT, fileUpload);
// router.get('/propiedades/:img', retornaImagen);


module.exports = router;