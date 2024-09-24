const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  age: Number,
  Gender: String,
 
});
const User = mongoose.model("User", userSchema);
module.exports = User;
