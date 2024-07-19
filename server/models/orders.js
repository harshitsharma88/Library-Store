const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Orders = new Schema({
    bookId:{
        type:Schema.ObjectId,
        ref:'Books',
        requireed:true
    },
    readerId:{
        type:Schema.ObjectId,
        ref:'Readers',
        required:true,
    },
    purchaseDate:{
        type:Date,
        required:true,
    },
    dueDate:{
        type:Date,
        required:true,
    },
    returnDate:{
        type:Date,
        default:null
    }

})

module.exports = mongoose.model('Orders',Orders);