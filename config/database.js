 
const chalk =require("chalk") 
const mongoose = require("mongoose");

const connectDB=async ()=>{
   await mongoose.connect("mongodb+srv://infoabigeorge:Ywru4fQ07kubUlzs@namastenode.koyix.mongodb.net/techieTinder")
}


module.exports=connectDB;