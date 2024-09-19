const express= require("express")
const chalk = require("chalk")
const app= express();
const port= 3000


app.use("/",(req,res)=>{
    res.send("no changes") 
    
})

app.get("/",(req,res)=>{
    res.send("hello from home page")
    
})
app.post("/",(req,res)=>{
   console.log("data recived")
    res.send("data successfully stored")
    
})
app.delete("/",(req,res)=>{
    res.send("data deleted")
    
})
app.put("/",(req,res)=>{
    res.send("details updated")
    
})



app.listen(port,()=>{
    console.log(chalk.blue.bgRed.bold(`Server successfully started at ${port}`))
}); 