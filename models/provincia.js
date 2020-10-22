


const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProvinciaSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    region: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Region'
    }

}, {
    collection: 'provincias'
});

ProvinciaSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
});


ProvinciaSchema.plugin(mongoosePaginate);
module.exports = model('Provincia', ProvinciaSchema);