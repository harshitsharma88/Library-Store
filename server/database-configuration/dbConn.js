const mongoose = require('mongoose');

async function dbConn (){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connectedd Successfully`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);  
    }
}


module.exports = dbConn;