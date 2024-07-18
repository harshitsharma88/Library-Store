const Admins = require('../models/admins');
const Books = require('../models/books');
const {generateJWT} = require('./login_homeController');

exports.getAdminPage=async(req,res,next)=>{
    res.send('Welcome Admin');
}

exports.adminLogin=async (req,res,next)=>{
    const{email,password} = req.body;

    try {
        const admin = await Admins.findOne({email});
        if(!admin){
            return res.status(404).json('No Admin with the given Email')
        }
        if(password==admin.password){
            return res.status(200).json({msg:'Welcome Admin',token:generateJWT(admin._id)});
        }
        else{
             res.status(401).json('Wrong Password');
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
        
    }

}

exports.addBook=async(req,res,next)=>{
    const {name,url,description,stock,category} = req.body;

    try {
        await Books.create({
            name:name,
            imageLink:url,
            description:description,
            stock:stock,
            category:category            
        })

        return res.status(201).json('Book Added');
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Book not Added');
        
    }

}