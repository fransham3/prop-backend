


const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PropiedadSchema = Schema({

    titulo: {
        type: String,
        required: true
    },
    tipo_prop: {
        type: String
    },
    tipo_oper: {
        type: String,
        required: true
    },
    region: {
        type: String
    },
    provincia: {
        type: String
    },
    comuna: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String
    },
    desc_corta: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: 'https://res.cloudinary.com/dyraidudw/image/upload/v1604545858/no-image_gdvvkm.jpg'
    },
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, {
    collection: 'propiedades'
});

PropiedadSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
});


PropiedadSchema.plugin(mongoosePaginate);
module.exports = model('Propiedad', PropiedadSchema);