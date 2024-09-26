const express = require("express");
const chalk = require("chalk");
const app = express();
const port = 3000;
let connectDB = require("../config/database");
const User = require("../models/UserModel");

app.use(express.json());
connectDB()
  .then(() => {
    console.log(chalk.blue.bgWhite.bold`Db connected`);
    app.listen(port, () => {
      console.log(
        chalk.green.bgWhite.bold(`Server successfully started at ${port}`)
      );
    });
  })
  .catch((err) => console.log(`DB not connected`));

app.post("/signup", async (req, res) => {
  const newUser = req.body;
  try {
    const user = new User(newUser);
    const Savedata = await user.save();
    res.send("data stored");
  } catch (err) {
    res.send("data not stored ");
  }
});
app.post("/signup/many", async (req, res) => {
  const newUserArray = req.body;
  try {
    const Savedata = await User.insertMany(newUserArray);
    res.send("data stored");
  } catch (err) {
    res.send("data not stored ");
  }
});

app.get("/user", async (req, res) => {
  try {
    const userdaat = await User.find({});
    res.send(userdaat);
  } catch (err) {
    res.send("data cant find ");
  }
});
app.patch("/user/edit", async (req, res) => {
  try {
    let firstName = req.body.firstName;
    let editlastname=req.body.lastName
    console.log(editlastname)
    const useredit = await User.updateOne({firstName:firstName},{lastName:editlastname});
    res.send("updated successfully");
  } catch (err) {
    res.send("data cant find ");
  }
});
