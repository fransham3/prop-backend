


const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PropiedadSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    provincia: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Provincia'
    }

}, {
    collection: 'comunas'
});

PropiedadSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
});


PropiedadSchema.plugin(mongoosePaginate);
module.exports = model('Comuna', PropiedadSchema);