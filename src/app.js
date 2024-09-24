const express = require("express");
const chalk = require("chalk");
const app = express();
const port = 3000;
let connectDB = require("../config/database");
const User = require("../models/UserModel");
const newdata= 
{firstName: "George Kutty",
lastName: "George",
password: "123",
email: "george@gmail.com",
age: 32,
Gender: "male"}

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

app.post("/signup",async(req, res) => {

try{
  const user=new User(newdata)
  const Savedate=await user.save()
  res.send("data stored")
}
catch(err){
  res.send("data not stored ")
}

});
