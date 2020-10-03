const fs = require('fs');

const Usuario = require('../models/usuario');
const Propiedad = require('../models/propiedad');


const actualizarImagen = async (id, nombreArchivo) => {


    
            const propiedad = await Propiedad.findById(id);
            if (!propiedad) {
                console.log('No es una propiedad');
                return false;
            }
            
            const pathViejo = `./uploads/propiedades/${propiedad.img}`;
            if (fs.existsSync(pathViejo)) {

                //borrar la imagen anterior
                fs.unlinkSync(pathViejo);
            }

            propiedad.img = nombreArchivo;
            await propiedad.save();
            return true;
  

    


}


module.exports = {
    actualizarImagen
}