
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

 const isUserAuth=async (req,res,next)=>{
    try{
        console.log("cotroll came to isuser auth")
        const token=req.cookies.token;

        const decode= await jwt.verify(token,"Blessing_abi123");
        console.log(decode)
        if(!decode){
            throw new Error("Please login")
        }
        const userId=decode.id
        const user= await User.findOne({_id:userId}).select('-password')
        req.user=user
        if(!user){
            throw new Error("login first")
        }

        next()
    }
    catch(err){
        res.send(err)
    }
 }
 module.exports = isUserAuth;