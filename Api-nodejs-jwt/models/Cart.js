const mongoose = require('mongoose');
const product = require('./Product');

const CartSchema = mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    address:{
        street:{type:String},
        city:{type:String},
        state:{type:String},
        number:{type:String},
    },
    payments:{
        method:{type:String},
        status:{type:String},
    }
})

module.exports = mongoose.model('Cart', CartSchema);

