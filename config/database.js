 
const chalk =require("chalk") 
const mongoose = require("mongoose");

const connectDB=async ()=>{
   try{
   await mongoose.connect("mongodb+srv://infoabigeorge:Ywru4fQ07kubUlzs@namastenode.koyix.mongodb.net/techieTinder")}
   catch(err){
     console.log(err)
   }
}


module.exports=connectDB;
