var validator = require("validator");



const validation = (data) => {
    
  const { firstName, lastName, password, email } = data
  if(validator.isEmpty(firstName)){
    throw new Error ("Please Enter your first name")
  }
  if(validator.isEmpty(lastName)){
    throw new Error ("Please Enter your last name")
  }
  if(!email){
    throw new Error("email is required")
  }else if(!validator.isEmail(email)){
    throw new Error("Invalid Email please enter a valid email")
  }
  if(!password){
    throw new Error ("Please enter a password")
  }else if(!validator.isStrongPassword(password)){
    throw new Error("Password is not strong enough. It should contain at least 8 characters, including uppercase and lowercase letters, numbers, and symbols.")
  }
    return data

};

module.exports = validation;