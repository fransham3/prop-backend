


const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RegionSchema = Schema({

    nombre: {
        type: String,
        required: true
    }
}, {
    collection: 'regiones'
});

RegionSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
});


RegionSchema.plugin(mongoosePaginate);
module.exports = model('Region', RegionSchema);