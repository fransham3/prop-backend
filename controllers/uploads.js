const path = require('path');
const fs = require('fs-extra');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const Img = require('../models/img');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cargarImagen = async (req, res = response) => {
    const fotos = await Img.find();
    console.log(fotos);
    res.json({
        ok: true,
        fotos
    });
}


const cargarImgById = async (req, res = response) => {
    const id = req.params.id;
    const fotos = await Img.findById(id);
    console.log(fotos);
    res.json({
        ok: true,
        fotos
    });
}


const cargarImgByPropiedad = async (req, res = response) => {
    const pID = String(req.params.pID);
    
   const fotos = await Img.find({propiedad_id: pID});

   res.json({
        ok: true,
        fotos
    });
    console.log(fotos);
}


const cargarPortada = async (req, res = response) => {

    const pID = String(req.params.pID);
    
    const fotos = await Img.findOne({propiedad_id: pID}).populate('propiedad_id', 'titulo');;
    console.log(fotos);
    res.json({
        ok: true,
        fotos
    });

}



const subirImagen = async (req, res = response) => {

    try {

        console.log(req.file);
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        console.log(result);
        const newImg = new Img({
            imageURL: result.url,
            public_id: result.public_id,
            propiedad_id: req.params.pID
        });
        await newImg.save();
        await fs.unlink(req.file.path);
        
        res.json({
            ok: true,
            msg: 'Archivo subido'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const eliminarImagen = async (req, res = response) => {

    const photo_id = req.params.photo_id;
    // const { photo_id } = req.params;
    const img = await Img.findByIdAndDelete(photo_id);
    console.log(img);
    const result = await cloudinary.v2.uploader.destroy(img.public_id);
    console.log(result);
}



////////////////////////////////////////////////////////

const fileUpload = (req, res = response) => {


    const id = req.params.id;

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se seleccionó ningún archivo'
        });
      }


    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1].toLowerCase();


    // Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg']; //Agregar videos
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }


    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/propiedades/${nombreArchivo}`;

    // Mover la imagen
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        
    // Actualizar la BD
    actualizarImagen(id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });






   

}



const retornaImagen = (req, res = response) => {

    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/propiedades/${img}`);

    // Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image.jpg`);
        res.sendFile(pathImg);
    }
    

}

module.exports = {
    fileUpload,
    retornaImagen,
    subirImagen,
    cargarImagen,
    eliminarImagen,
    cargarImgById,
    cargarImgByPropiedad,
    cargarPortada,

}