const express = require("express");
const chalk = require("chalk");
const app = express();
const port = 3000;
let connectDB = require("../config/database");
const User = require("../models/UserModel");

app.use(express.json());
// app.use(express.urlencoded({extended:true}))
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

///APIs
app.get("/user", async (req, res) => {
  try {
    const findquery = req.body.firstName;
    const userdaat = await User.find({ firstName: findquery });
    res.send(userdaat);
  } catch (err) {
    res.send("data cant find ");
  }
});

app.post("/signup", async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
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

app.get("/user/:id", async (req, res) => {
  try {
    const finddata = req.params.id;
    console.log(finddata);
    const userdaat = await User.findById(finddata);
    res.send(userdaat);
  } catch (err) {
    res.send("data cant find ");
  }
});

app.patch("/user/edit/:userId?", async (req, res) => {
  try {
    const userId = req?.params?.userId;
    const { ...updates } = req.body;
    console.log(userId);
    console.log(updates);

    const updatesAllowed = ["firstName", "lastName", "password","skills","email"];
    const updatesObj = updates;
    const isupdateAllowed = Object.keys(updatesObj).every((key) =>
      updatesAllowed.includes(key)
    );
    if (!isupdateAllowed) {
      throw new Error("ristricted edit feild");
    }
    // if(updates.skills.length>10){
    //   throw new Error ("skill should be lessthan 10")
    // }

    console.log(isupdateAllowed);
    const useredit = await User.updateOne(
      { _id: userId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (useredit) {
      res.send("updated successfully");
    } else {
      throw new Error();
    }
  } catch (err) {
    res.send("data cant find ");
    console.log(err.message);
  }
});

app.delete("/user", async (req, res) => {
  const { _id } = req.body;
  try {
    let deleteUser = await User.deleteOne({ _id });
    if (!deleteUser) {
      return res.send("User not deleted");
    } else {
      return res.send("User  deleted successfully ");
    }
  } catch (err) {
    console.log("error occurred about ");

    return res.send(" cant find user User not deleted");
  }
});
