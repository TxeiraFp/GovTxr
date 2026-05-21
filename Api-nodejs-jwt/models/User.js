const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{type:String},
    username:{type:String},
    phone:{type:String},
    password:{type:String},
    role: { type: String, default: "user" }
})

module.exports = mongoose.model('Client', UserSchema);
