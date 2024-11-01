const express = require("express");
const chalk = require("chalk");
const app = express();
const port = 3000;
let connectDB = require("../config/database");
var cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const authRouter=require("../routes/auth")
const requesstRouter=require("../routes/request")
const profileRouter=require("../routes/profile")
const userRouter =require("../routes/user")


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/",authRouter)
app.use("/",requesstRouter)
app.use("/",profileRouter)
app.use("/",userRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

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



