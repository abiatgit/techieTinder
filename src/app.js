const express= require("express")
const chalk = require("chalk")
const app= express();
const port= 3000


app.use("/home",(req,res)=>{
   res.send("home")
})
app.use("/about",(req,res)=>{
   res.send("About")
})


app.listen(port,()=>{
    console.log(chalk.blue.bgRed.bold(`Server successfully started at ${port}`))
}); 