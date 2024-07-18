const jwt = require('jsonwebtoken');
const Admins = require('../models/admins');
const Readers = require('../models/readerAccount');

async function authenticate(req,res,next){
    const token = req.header('auth');
    const account = req.header('role');

    try {
        if(!token){
            return res.status(401).json("Authorization token missing");
        }
        const {_id} = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(account=='reader'){
            const reader = await Readers.findById(_id);
            if(!reader){
                return res.status(404).json('Reader not found');
            }
            req.user = reader;
            next()
            return;

        }
        else if(account=='admin'){
            const admin = await Admins.findById(_id);
            if(!admin){
                return res.status(404).json('Admin not found');
            }
            req.user = admin;
            next()
            return;


        }
        else{
            return res.status(400).json("Authentication failed");

        }
        
    } catch (error) {
        res.status(500).json('Authentication Error')
        
    }

}

module.exports= authenticate;