const express = require("express");
const profileRouter = express.Router();
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const isUserAuth = require("../middilewares/userAuth");
const { isAllowedEditData } = require("../utils/validation");
const logger = require("logger");

const bcrypt = require("bcrypt");
const { json } = require("body-parser");




profileRouter.get("/profile", isUserAuth, async (req, res) => {
  try {
  
    let loggedUser = await req.user
    res.status(200).json({ message: "Success", data: loggedUser });
  } catch (err) {
    
    console.error("Profile retrieved successfully", err);
    res
      .status(500)
      .json({ message: "An error occuared while fetching your profile" });
  }
});

profileRouter.patch("/edit/profile", isUserAuth, async (req, res) => {
console.log(req.body)
  try {
    const editData = req.body;
    const loggedUser = req.user;
    if (!editData || Object.keys(editData).length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No data provided for update" });
    }

    const allowedFields = isAllowedEditData(editData);

    if ( allowedFields.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No valid fields to update" });
    }

    const updatedFields = [];
    allowedFields.forEach((field) => {
      if (editData[field] !== undefined) {
        loggedUser[field] = editData[field];
        updatedFields.push(field);
      }
    });

    if (updatedFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields were updated"
      });
    }

    await loggedUser.save();

    res.status(200).json({success:true, message: "Profile successfully updated" ,data:loggedUser});
    console.log(`logged usser ${loggedUser}`)
  } catch (error) {
   console.log(error)
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the profile",
    });
  }
});

profileRouter.patch("/forgot/password", isUserAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const{password,confirmPassword}=req.body
    if(!password || password.length <8){
      return res.status(400).json({message:"password must be at least 8 characters long"})
    }

    if( password !== confirmPassword){
      return res.status(400).json({message:" Password not match"})
    }

    const passwordHash = await bcrypt.hash(password,12);
    loggedUser.password = passwordHash;
    await loggedUser.save();
    
    res.status(200).json({message:`update password succesfully`})
  } catch (err) {
    console.error(`Error updating password`,err)
    res.status(500).json.json({ message: `An error occuared while editing your password`});
  }
});

profileRouter.delete("/delete",isUserAuth,async(req,res)=>{
 try{
  const loggedUser=req.user
  const deletedUser = await User.findOneAndDelete({_id:loggedUser._id})
  if(!deletedUser){
    return res.status(400).json({message:"Can not delete the user"})
  }

  return res.status(200).json({message:`User successfuly deleted`})
 }
 catch(err){
    res.status(500).json({message:"An error occured while deleting the user"})
 }

})
module.exports = profileRouter;
