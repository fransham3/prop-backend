


const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ImgSchema = Schema({

    imageURL: {
        type: String
    },
    public_id: {  // para Cloudinary
        type: String
    },
    propiedad_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Propiedad'
    }

}, {
    collection: 'imagenes'
});

ImgSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
});


ImgSchema.plugin(mongoosePaginate);
module.exports = model('Img', ImgSchema);