const mongoose = require("mongoose");
const { Schema } = require("mongoose");

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
    maxLength:[12,"Maximum 12 letters allowed"],
    select: false
   
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match:[/.+@.+\..+/,"Please provide a valid email address"]

  },
  phone:{
    required:true,
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
const User = mongoose.model("User", userSchema);
module.exports = User;