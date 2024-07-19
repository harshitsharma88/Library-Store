require('dotenv').config(); // dotenv configuration
const PORT = process.env.PORT;
/// Requiring all the packages
const express= require('express');
const cors = require('cors');


const app = express();
app.use(express.json());


// Database Connection
const dbConn = require('./database-configuration/dbConn');



// Configuring all the Routes 
const homeRoute = require('./routes/login_home_Route');
const adminRoute = require('./routes/adminRoutes');
const readerRoute = require('./routes/readerRoute');
const passwordRoute = require('./routes/passwordRoute');

// Route all requests
app.use('/',homeRoute);
app.use('/reader',readerRoute);
app.use('/admin',adminRoute);
app.use('/password',passwordRoute);


dbConn()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server listening on PORT ${PORT}`);
    })
}).catch((error)=>{
    console.log(error);
    process.exit(1);
})

