 
const chalk =require("chalk") 
const mongoose = require("mongoose");

const connectDB=async ()=>{
   await mongoose.connect("mongodb+srv://infoabigeorge:CetIkUPqPhFBKLAa@namastenode.koyix.mongodb.net/techieTinder")
}


module.exports=connectDB;