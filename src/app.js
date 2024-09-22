const express = require("express");
const chalk = require("chalk");
const app = express();
const port = 3000;
const{adminAuth,userAuth}=require("../middileware/auth")




app.get("/admin/all",adminAuth,(req,res)=>{
  res.send("here is your users data")
})
app.post("/admin/all",adminAuth,(req,res)=>{
  res.send("here is your users data updated")
})
app.delete("/admin/all",adminAuth,(req,res)=>{
  res.send("here is your users data deleted")
})
app.get("/user/all",userAuth,(req,res)=>{
  res.send("here is your users data")
})
app.get("/user/login",(req,res)=>{
  res.send("login here")
})
app.post("/user/all",userAuth,(req,res)=>{
  res.send("here is your users data updated")
})
app.delete("/user/all",userAuth,(req,res)=>{
  res.send("here is your users data deleted")
})

app.listen(port,() => {
  console.log(chalk.blue.bgRed.bold(`Server successfully started at ${port}`));
});
