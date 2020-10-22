/*
    Ruta: /api/todo/:busqueda
*/

const { Router } = require('express');
const { getBusquedasTotales } = require('../controllers/busquedas');


const router = Router();

router.get('/:busqueda', getBusquedasTotales );






module.exports = router;






