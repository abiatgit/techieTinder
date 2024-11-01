const express = require("express");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/UserModel");
const requesstRouter = express.Router();
const isUserAuth = require("../middilewares/userAuth");

requesstRouter.post("/user/request/:status/:userId", isUserAuth, 
async (req, res) => {
  try {
    const fromUser = req.user._id.toString();
    const toUser = req.params.userId;
    const status = req.params.status.toLowerCase()

    const allowedStatus = ["interest", "ignore"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }

    const existingUser = await User.findOne({ _id: toUser });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUser, toUser },
        { fromUser: toUser, toUser: fromUser },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({message:"Request already exists"});
    }

    const newConnectionRequest = await ConnectionRequest({
      fromUser: fromUser,
      toUser: toUser,
      status: status,
    });
    await newConnectionRequest.save();
    res.status(201).json({message:`${req.user.firstName} is ${status} to ${existingUser.firstName}`,request:newConnectionRequest});
  } catch (err) {
    res.status(500).json({ message: "An error occurred, please try again" });
  }
});

requesstRouter.post("/request/review/:status/:reqId",isUserAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { reqId, status } = req.params;
      const allowedStatus = ["accept", "reject"];

        // Validate status
      if (!allowedStatus.includes(status.toLowerCase())) {
       return  res.status(400).json({message:"Invalid status"})
      }

        // Find the request
      const findingRequest  = await ConnectionRequest.findOne({
        _id:reqId,
        toUser: loggedInUser._id,
        status: "interest",
      });

      if (!findingRequest ) {
       return  res.status(404).json({message:"No matching request found"})
      }
      findingRequest.status = status;
      const updatedRequest = await findingRequest .save();
      if (!updatedRequest) {
        throw new Error("Failed to update request status");
      }

      res.status(200).json({message:`Request ${status}ed successfully`,request:updatedRequest});
    } catch (err) {
      console.error(`Error in reviewing request :`,err)
      res.status(400).json({ message:"An Error occurred while processing the request"})
    }
  }
);

module.exports = requesstRouter;
