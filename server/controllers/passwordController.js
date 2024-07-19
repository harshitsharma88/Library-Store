const {v4:uuid} = require('uuid');
const sib = require('sib-api-v3-sdk');
const Links = require('../models/passwordLinks');
const Readers = require('../models/readerAccount');
const bcrypt = require('bcrypt');

exports.forgotPassword=async(req,res,next)=>{
    try {

        const {email}= req.body;

        const reader = await Readers.findOne({email:email});
        
        if(!reader){
            return res.status(404).json("User Doesn't Exist");
        }

        const id=uuid();
        

        const client = sib.ApiClient.instance;
        const apiKey = client.authentications["api-key"];
        apiKey.apiKey = process.env.SIB_API_KEY;
        const tranEmailApi = new sib.TransactionalEmailsApi();

        const sender = {
            email:'harshit7174@gmail.com',
            name:'Harshit Sharma'
        }
        
        const receivers = [
            {
                email:email
            },
        ]

        await tranEmailApi.sendTransacEmail({
            sender,
            to:receivers,
            subject:'Reset Password Link',
            textContent:' Link Here ',
            htmlContent:`<h4>Dear ${reader.name} </h4><br>
            <a href="http://localhost:3000/password/setnewpassword/{{params.rqstid}}">Click here</a> to reset your password of your Library account.<br>`,
            params:{
                rqstid:id
            },
        })

        await Links.create({
            id:id,
            active:true,
            readerId:reader._id
        })   
        return res.status(200).json('Email Sent')

    } catch (error) {
        console.log(error);

        res.status(500).json("Error Occurred")
        
    }

}

exports.setNewPassword=async (req,res,next)=>{
    try {
         const resetlink= await Links.findOne({id:req.params.rqstid});

         if(!resetlink){
            return res.status(404).send("<h1>Link not Exists</h1>")
         }

         if(!resetlink.active){
            return res.status(200).send('<h1>Link Expired</h1>')
         }
         await Links.updateOne({id:req.params.rqstid},{active:false})

        return res.status(200).send("<h1>Reset password Page</h1>");
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
        
    }

}

exports.updatePassword=async(req,res,next)=>{
    const {rqstid,password} = req.body

    try {

        const resetlink= await Links.findOne({id:rqstid});

        if(!resetlink){
            return res.status(404).json('Link not found')
        }

        const hashed= await bcrypt.hash(password,10);

        await Readers.updateOne({_id:resetlink.readerId},{password:hashed});

        res.status(200).json({message:'Password Set Successfully'})


        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error Occurred'})
        
    }
}


