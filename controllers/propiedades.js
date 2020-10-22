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
            return res.status(500).json({mensaje: 'Error al cargar propiedades'});
        }

    res.json({result});
    });
    
    // console.log(req.query.page);
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

const actualizarPropiedad = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const propiedad = await Propiedad.findById(id);

        if (!propiedad) {
            return res.status(404).json({
                ok: false,
                msg: 'Propiedad no encontrada por ID',
                id
            })
        }

        const cambiosPropiedad = {
            ...req.body,
            usuario: uid
        }

        const propiedadActualizada = await Propiedad.findByIdAndUpdate(id, cambiosPropiedad, {new: true})
        
        
        res.json({
            ok: true,
            propiedad: propiedadActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const borrarPropiedad = async (req, res = response) => {

    const id = req.params.id;

    try {

        const propiedad = await Propiedad.findById(id);

        if (!propiedad) {
            return res.status(404).json({
                ok: false,
                msg: 'Propiedad no encontrada por ID',
                id
            })
        }

        await Propiedad.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'Propiedad eliminada'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const modalPropiedades = async (req, res = response) => {
    const id = String (req.params.id);
    const propsModal = await Propiedad.find({_id: id});

    res.json({
        ok: true,
        propsModal
    });
}


module.exports = {
    getPropiedades,
    crearPropiedad,
    actualizarPropiedad,
    borrarPropiedad,
    modalPropiedades
}