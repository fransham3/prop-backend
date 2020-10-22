
/*
    Ruta: /api/ubicaciones
*/


const {Router} = require('express');
const { check } = require('express-validator');
const { getRegiones, 
        crearRegion, 
        getProvincias, 
        crearProvincia, 
        getComunas, 
        crearComuna, 
        getdelget} = require('../controllers/ubicaciones');

const router = Router();

// REGIONES
router.get('/regiones', getRegiones);

router.post('/regiones', 
        [
            check('nombre', 'El nombre de la región es necesario').not().isEmpty()
        ],
        crearRegion);

// PROVINCIAS
router.get('/provincias/:rID', getProvincias);

router.post('/provincias',  
        [
            check('nombre', 'El nombre de la provincia es necesario').not().isEmpty(),
            check('region', 'El ID de la región debe ser válido').isMongoId()
            
        ],
        crearProvincia);


// COMUNAS
// router.get('/comunas/:pID', getComunas);

router.post('/comunas',  
        [
            check('nombre', 'El nombre de la comuna es necesario').not().isEmpty(),
            check('provincia', 'El ID de la provincia debe ser válido').isMongoId()
            
        ],
        crearComuna);
        

router.get('/comunas/:id', getdelget);
        









module.exports = router;