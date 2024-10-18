const express = require("express");
const profileRouter = express.Router();
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const isUserAuth = require("../middilewares/userAuth");
const { isAllowedEditData } = require("../utils/validation");

const bcrypt = require("bcrypt");

profileRouter.get("/profile", async (req, res) => {
  try {
    let cookie = req.cookies.token;

    let veryfied = await jwt.verify(cookie, "Blessing_abi123");
    console.log(veryfied);
    let user = await User.findOne({ _id: veryfied.id });
    console.log(user);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

profileRouter.patch("/edit/profile", isUserAuth, async (req, res) => {
  try {
    const editDAte = req.body;
    const isAllowedEditDataCame = isAllowedEditData(editDAte);

    if (!isAllowedEditDataCame) {
      return res
        .status(404)
        .json({ success: false, message: "this data can not edit" });
    }
    const loggedUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
    await loggedUser.save();

    res.send(loggedUser.firstName);
  } catch (error) {
    console.error("Profile edit error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the profile",
    });
  }
});

profileRouter.patch("/forgot/password", isUserAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    loggedUser.password = passwordHash;
    await loggedUser.save();
    console.log(loggedUser.password);
    res.send(`update password sucesfuluy`);
  } catch (err) {
    res.send("cant update error happend");
  }
});
module.exports = profileRouter;
