const {response} = require('express');
// const { Img } = require('../../Propiedades/propiedades/src/app/models/img.model');
const Propiedad = require('../models/propiedad');


const getBusquedasTotales = async (req, res = response) => {
    
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    
    const options = {
        limit: 9,
        page: req.query.page
    }

    // const img = Img.findOne({ propiedad_id });
    
    Propiedad.paginate( ({ titulo: regex }),options, function(err, result){
        if(err){
            return res.status(500).json({mensaje: 'Error al cargar propiedades'});
        }
    
    res.json({result, busqueda});
    });

}









module.exports = {
    getBusquedasTotales
}