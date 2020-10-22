const {response} = require('express');

const Region = require('../models/region');
const Provincia = require('../models/provincia');
const Comuna = require('../models/comuna');



///////////////////// REGIONES
const getRegiones = async (req, res = response) => {

    const regiones = await Region.find({}, 'nombre');


    res.json({
        ok: true,
        regiones
    });
}

const crearRegion = async (req, res = response) => {

    const {nombre} = req.body;

    try {

        const region = new Region(req.body);
        
        //Guardar region
        await region.save();

        res.json({
            ok: true,
            region
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }

}

///////////////////// PROVINCIAS
const getProvincias = async (req, res = response) => {
    
    const rID = String(req.params.rID);
    
   const provincias = await Provincia.find({region: rID});

   res.json({
        ok: true,
        provincias
    });

}



const crearProvincia = async (req, res = response) => {


    const rID = req.params.region;
    const provincia = new Provincia({
        region: rID,
        ...req.body
    });
    

    try {

        const provinciaDB = await provincia.save();


        res.json({
            ok: true,
            provincia: provinciaDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const getdelget = async (req, res = response) => {
    const id = String (req.params.id);
    const comunas = await Comuna.find({provincia: id});

    res.json({
        ok: true,
        comunas
    });
}

///////////////////// COMUNAS
// const getComunas = async (req, res = response) => {
    
//     const pID = String(req.params.pID);
    
//    const comunas = await Comuna.find({provincia: pID});

//    res.json({
//         ok: true,
//         comunas
//     });

// }

// const getComunas = async (req, res = response) => {

//     const pID = String(req.params.pID);
    
//     const comunas = await Comuna.find({provincia: pID});

//     console.log(pID);
//     res.json({
//         ok: true,
//         comunas
//     });
// }


const crearComuna = async (req, res = response) => {


    const pID = req.params.provincia;
    const comuna = new Comuna({
        provincia: pID,
        ...req.body
    });
    

    try {

        const comunaDB = await comuna.save();


        res.json({
            ok: true,
            provincia: comunaDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}





module.exports = {
    getRegiones,
    crearRegion,
    getProvincias,
    crearProvincia,
    
    crearComuna,
    getdelget
}