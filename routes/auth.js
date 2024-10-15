const express = require("express");
const validation = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { now } = require("mongoose");
const isUserAuth = require("../middilewares/userAuth");

authRouter.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    validation(body);
    const { firstName, lastName, password, email } = req.body;
    let passwordbycrpt = await bcrypt.hash(password, 10);
    console.log(passwordbycrpt);
    const user = new User({
      firstName,
      lastName,
      password: passwordbycrpt,
      email,
    });
    const Savedata = await user.save();
    const token = jwt.sign({ id: Savedata._id.toString() }, "Blessing_abi123");
    console.log(token);
    res.send("data saved");
  } catch (err) {
    res.send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Input validation
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
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await user.isPasswordVerified(password);

    if (isMatch) {
      const token = await user.jwtToken();

      if (!token) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to generate token" });
      }

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure in production
        sameSite: "strict",
        maxAge: 3600000, // 1 hour in milliseconds
      });

      return res
        .status(200)
        .json({ success: true, message: "Successfully logged in" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err.stack);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during login" });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", "", { expairy: Date.now(0) });

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});


module.exports = authRouter;
