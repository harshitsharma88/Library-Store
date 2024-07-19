const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Links = new Schema({
    id:{
        type :String,
        required:true
    },
    readerId:{
        type:Schema.Types.ObjectId,
        ref:'Readers',
        required:true
    },
    active:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Links',Links);