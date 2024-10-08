const express = require("express");
const chalk = require("chalk");
const app = express();
const port = 3000;
let connectDB = require("../config/database");
const User = require("../models/UserModel");
const validation = require("../utils/validation");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const isUserAuth = require("../middilewares/userAuth");

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

    const updatesAllowed = [
      "firstName",
      "lastName",
      "password",
      "skills",
      "email",
    ];
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
app.get("/home", async (req, res) => {
  try {
    let cookie = req.cookies.token;
    let veryfied = await jwt.verify(cookie, "Blessing_abi123");
    console.log(veryfied.id);
    res.send("welcome buddy" + veryfied.id);
  } catch (err) {
    res.send(err);
  }
});
app.get("/profile", async (req, res) => {
  try {
    let cookie = req.cookies.token;
    let veryfied = await jwt.verify(cookie, "Blessing_abi123");
    let user = await User.findOne({ _id: veryfied.id });
    console.log(user);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

app.get("/getpage", isUserAuth, (req, res) => {
  res.send(`welcome to getpage${req.user.firstName}`);
});
app.post("/connecton/request", isUserAuth, (req, res) => {
  res.send(`connection sent from ${req.user.firstName}`);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const { _id } = user;
    const idstring = _id.toString();

    if (!user) {
      throw new Error("User not fount");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = await jwt.sign({ id: idstring }, "Blessing_abi123", {
        expiresIn: "1h",
      });

      if (!token) {
        throw new Error();
      }

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000, // 1 hour in milliseconds
      expires: new Date(Date.now() + 3600000) // 1 hour from now
    });

      res.send("succesfuly logged");
    } else {
      res.send("woring credentioan you can not login");
    }
  } catch (err) {
    res.send(err);
  }
});
