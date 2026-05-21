const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    description:{type:String},
    quantity:{type:Number},
    imagem:{type:String},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true 
});

module.exports = mongoose.model('Product',  ProductSchema);