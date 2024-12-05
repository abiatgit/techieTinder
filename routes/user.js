const express = require("express");
const userRouter = express.Router();
const isUserAuth = require("../middilewares/userAuth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/UserModel");

const Safe_User_Data = " _id firstName lastName about skills age photoUrl";

userRouter.get("/user/request/received", isUserAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const findRequests = await ConnectionRequest
      .find({
        toUser: loggedUser._id,
        status: "interest",
      })
      .populate("fromUser", Safe_User_Data);

    if (findRequests.length === 0) {
      return res.status(400).json({message:"No pending request found"})
    }
    console.log(findRequests)
    res.status(200).json({ message: "Requests retrieved successfully",data:findRequests });
  } catch (err) {
    console.error(`Error fetching recived requests:`,err)
    res.status(500).json({message:"An error occurred while fetching requests" });
  }
});

userRouter.get("/user/connections", isUserAuth, async (req, res) => {
  try {
    let loggedUser = req.user;

    const connections = await ConnectionRequest
      .find(
        {
          $or: [{ toUser: loggedUser._id }, { fromUser: loggedUser._id }],
          status: "accept",
        },
        { firstName: true, lastName: true, _id: false }
      )
      .populate("fromUser", Safe_User_Data)
      .populate("toUser", Safe_User_Data)
      .lean()

    const data = connections.map((row) => {
      if (row.fromUser._id.toString() === loggedUser._id.toString()) {
        return row.toUser;
      }
      return row.fromUser;
    });
    res.status(200).json({message:"success",data:data})
  } catch (err) {
    console.error('Error fetching received requests:', err);
    res.status(400).json({message:"An error occurred while fetching requests"})
  }
});

userRouter.get("/user/feed", isUserAuth, async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = Math.min(limit,50)
    page=Math.max(1,page)
    const skip = (page - 1)* limit;

    const loggedUser = req.user;
    const connectionRequests = await ConnectionRequest
      .find({
        $or: [{ fromUser: loggedUser._id }, { toUser: loggedUser._id }],
      })
      .select("fromUser toUser ");

    const filteredUsers = new Set();

    filteredUsers.add(loggedUser._id.toString());
    connectionRequests.forEach((req) => {
      filteredUsers.add(req.fromUser.toString());
      filteredUsers.add(req.toUser.toString());
    });

    const users = await User.find({ _id: { $nin: Array.from(filteredUsers) } })
      .select(Safe_User_Data)
      .skip(skip)
      .limit(limit)
      .lean()

      if(users.length===0){
        return res.status(404).json({message:"No User found for the feed"})
      }
      const totalUsers = await User.countDocuments({_id:{$nin:Array.from(filteredUsers)}})
      const totalPages=Math.ceil(totalUsers/limit)

    res.status(200).json({ message: "Feed retrieved successfully", data: users ,pagination:{
      currentPage:page,totalPages:totalPages,totalUsers:totalUsers
    }});
  } catch (err) {
    console.error(`Error processing feed request:`,err)
    res.status(500).json({message:"An error occuared while prcessin your feed request"})
  }
});

module.exports = userRouter;
