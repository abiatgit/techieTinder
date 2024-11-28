const express = require("express");
const { validation } = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { now } = require("mongoose");
const isUserAuth = require("../middilewares/userAuth");
const logger = require("logger");

authRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    validation(body);

    const { firstName, lastName, password, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User Already exists" });
    }

    let passwordbycrpt = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      password: passwordbycrpt,
      email,
      age,
      gender,
      photoUrl,
      about,
      phone

    });

    const Savedata = await user.save();

    res.status(201).json({
      message: "You have successfuly sign up ,please login",
      userId: Savedata._id,
    });
  } catch (err) {
    logger.error("Signup Error;", err);
    res.status(500).json({ message: "An error occurred during signup" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.isPasswordVerified(password);

    if (isMatch) {
      const token = await user.jwtToken();
      console.log(token);

      if (!token) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to generate token" });
      }

      res.cookie("token", token, {
        maxAge: 3600000, // 1 hour in milliseconds
      });
      console.log(`Token sent ${token}`);
      return res.status(200).json({
        success: true,
        message: "Successfully logged in",
        data: user
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    logger.error("Login error:", err.stack);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during login" });
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    // res.clearCookie("token",{httpOnly:true})
    res.cookie("token", "", { expairy: Date.now(0) });
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (err) {
    logger.error("Signup Error;", err);
    res.status(500).json({ message: "An error occurred during logout" });
  }
});

module.exports = authRouter;
