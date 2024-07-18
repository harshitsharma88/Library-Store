const mongoose = require('mongoose');

const Books = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageLink:{
        type:String,

    },
    description:{
        type:String
    },
    category:{
        type:Array,
    },
    stock:{
        type:Number,
    }
})

module.exports = mongoose.model('Books',Books);