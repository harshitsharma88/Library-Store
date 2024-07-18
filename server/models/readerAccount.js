const mongoose = require('mongoose');

const Readers = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    totalFine:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Readers',Readers);