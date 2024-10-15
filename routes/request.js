const express = require("express");

const requesstRoute = express.Router();
const isUserAuth = require("../middilewares/userAuth");

requesstRoute.post("/connecton/request", isUserAuth, (req, res) => {
  res.send(`connection request sent from ${req.user.firstName}`);
});

module.exports = requesstRoute;
