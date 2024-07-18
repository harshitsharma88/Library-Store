const Readers = require('../models/readerAccount');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getLoginPage=async function(req,res,next){
    return res.json('Hey');
}

exports.createReader= async(req,res,next)=>{
    const {name,password,email}=req.body;
    try {
        const hashed=await bcrypt.hash(password,10);
        const reader = await Readers.create({
            name:name,
            password:hashed,
            email:email
        })

        return res.status(201).json(reader._id);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Not Created');
        
    }

}

exports.generateJWT=function(_id){
    return jwt.sign({_id},process.env.JWT_SECRET_KEY);
}

exports.login=async(req,res,next)=>{
    const {email,password}= req.body;

    try {
        const reader = await Readers.findOne({email:email});
        if(reader){
            bcrypt.compare(password,reader.password,(err,result)=>{
                if(err){
                    return res.status(500).json('Something Went Wrong')
                }
                if(result){
                    return res.status(200).json({token:exports.generateJWT(reader._id),name:reader.name});
                }
                else{
                    return res.status(401).json('Wrong password')
                }
            })

        }
        else{
            return res.status(404).json('User Not Found');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server error');
        
    }
}

