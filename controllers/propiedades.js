const {response} = require('express');

const Propiedad = require('../models/propiedad');

const getPropiedades = async (req, res = response) => {


    // const propiedades = await Propiedad.find()
    //                                 .populate('usuario', 'nombre');

    const populate = [
        {path: 'usuario', select: 'nombre'},        
    ];


    const options = {
        populate,
        limit: 10,
        page: req.query.page
    }

    Propiedad.paginate({},options, function(err, result){
        if(err){
            return res.status(500).json({mensaje: 'Error al cargar usuarios'});
        }

    res.json({result});
    });
    
    console.log(req.query.page);
}


const crearPropiedad = async (req, res = response) => {

    const uid = req.uid;
    const propiedad = new Propiedad({
        usuario: uid,
        ...req.body
    });

    try {

        const propiedadDB = await propiedad.save();


        res.json({
            ok: true,
            propiedad: propiedadDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    

}

const actualizarPropiedad = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarPropiedad'
    })

}

const borrarPropiedad = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarPropiedad'
    })

}


module.exports = {
    getPropiedades,
    crearPropiedad,
    actualizarPropiedad,
    borrarPropiedad
}