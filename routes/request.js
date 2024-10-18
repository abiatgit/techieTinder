const express = require("express");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/UserModel");
const requesstRoute = express.Router();
const isUserAuth = require("../middilewares/userAuth");

requesstRoute.post("/request/:status/:userId", isUserAuth, async (req, res) => {
  try {
    const fromUser = req.user._id.toString();
    const toUser = req.params.userId;
    const status = req.params.status;

    const allowedStatus = ["interest", "ignore"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "status not allowed" });
    }
    const existingUser = await User.findOne({ _id: toUser });

    if (!existingUser) {
      return res.status(400).json({ message: "this user not avialbele" });
    }
    const existingReqest = await connectionRequest.findOne({
      $or: [
        { fromUser, toUser },
        { fromUser: toUser, toUser: fromUser },
      ],
    });
    if (existingReqest) {
      return res.status(400).send("reqest already send");
    }

    const sentconnectionRequest = await connectionRequest({
      fromUser: fromUser,
      toUser: toUser,
      status: status,
    });
    await sentconnectionRequest.save();
    res.send(`${req.user.firstName} is ${status} to ${existingUser.firstName}`);
  } catch (err) {
    res.status(400).json({ message: `something went worong try again${err}` });
  }
});

module.exports = requesstRoute;
