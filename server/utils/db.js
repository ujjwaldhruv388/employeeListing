const mongoose = require("mongoose")
require("dotenv").config()


exports.connectDb = async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB connection successfully')
    }catch(error){
        console.log(error)
        console.log('Error in DB connection')
    }
}