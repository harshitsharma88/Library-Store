const Books = require('../models/books');
const Orders = require('../models/orders');

exports.getReaderPage=async(req,res,next)=>{
    res.send('Welcome Reader');
}

exports.getAllBooks=async(req,res,next)=>{
    const {category} = req.body;
    try {
        if(!category){
            const books = await Books.find();
            return res.status(200).json(books);
        }
        else{
            const books = await Books.find({category:category});
            return res.status(200).json(books);

        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
        
    }

}

exports.getBookDetails= async(req,res,next)=>{
const {bookid}= req.params
    try {
        const book = await Books.findById(bookid);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
    }
}

exports.rentBook = async(req,res,next)=>{
    const{bookId}= req.body;
    const {user}=req;
        try {
            const book = await Books.findById(bookId);
            if(!book){
                return res.send(404).json("Book not Found");
            }
            if(book.stock==0){
                return res.send(400).json("Out of Stock");
            }

            const stockUpdate = Books.findByIdAndUpdate(bookId,{$inc:{stock:-1}});
            const date= new Date();
            const Year = date.getFullYear();
            const Month = date.getMonth();
            const Day = date.getDate();
            const nowDate = new Date(Year,Month,Day);
            const dueDate = new Date(Year,Month+1,Day);

            const order = Orders.create({
                bookId:bookId,
                readerId:user._id,
                purchaseDate:nowDate,
                dueDate:dueDate
                // purchaseDate:new Date(2024,4,1).setHours(0,0,0),
                // dueDate:new Date(2024,5,10).setHours(0,0,0)
            })

            await Promise.all([stockUpdate,order]);

            return res.send('Rented');           
            
        } catch (error) {
            console.log(error);
            res.status(500).json('Server Error')
        }
}

async function fineCalculate(userId){
    
    try {
        const today = new Date().setHours(0,0,0);

        const orders = await Orders.find({readerId:userId,dueDate:{$lt:today},returnDate:null});
        let fine =0;
        
        orders.forEach(ord=>{
                const diff = today-ord.dueDate;
                const days = Math.ceil(diff/(1000*24*60*60));
                fine = fine +(days*10);           
        });

        return fine;

        // return orders;

    } catch (error) {
        console.log(error);
        throw new Error();
      
    }

}

exports.getTotalFine= async(req,res,next)=>{
    const {user} = req;
    try {
        const fine = await fineCalculate(user._id);
        return res.json(fine);
    } catch (error) {
        console.log(error);
        res.status(500).json("Sever Error")
        
    }
}