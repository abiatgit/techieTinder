const mongoose = require("mongoose");
const { Schema } = require("mongoose");
var validator = require('validator');
const jwt = require('jsonwebtoken');
var bcrypt =require("bcrypt")

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true,"first name must required"],
    minLength:[3,"minimum length must me 3 letters please"],
    maxLength:[50,"Maximum 50 letters "],
    trim:true
  },
  lastName: {
   type:String,
   required:[true,"last name must be added"]
  },
  password: {
    type: String,
    required: true,
    minLength:[6,"minimum six letters needed"],
    maxLength:[200,"Maximum 12 letters allowed"],
    
   
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate:{
      validator:function(value){
        return validator.isEmail(value)
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone:{
    
    type:String,
    validate:
    {validator:function (value){
      return /\d{10}/.test(value); 
    },
    message:"phone number must be 10 digit",

  }
  },
  about:{
    type:String,
    default:"i'am a new user"
  },
  skills:{
    type:[Schema.Types.Mixed]
  },
  age:{
    type:Number,
    min:[18,"you must be 18 years or more"],
    max:[100,"you must be less than 100 years old"]
  },
  Gender: {
    type:String,
    enum:["male","female","others"]
 
  },
},
{timestamps:true}
);
userSchema.methods.jwtToken=async function (){
 const token=await jwt.sign({id: this._id }, "Blessing_abi123", {
    expiresIn: "1h",
  })
  return token
}

userSchema.methods.isPaswordverfiyed =async function (userTypedpassword) {
  const hashedPassword=this.password
  let isPasswordvalid=await bcrypt.compare(userTypedpassword,hashedPassword);
  return isPasswordvalid;
}
const User = mongoose.model("User", userSchema);
module.exports = User;
