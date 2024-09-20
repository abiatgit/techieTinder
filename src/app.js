const express= require("express")
const chalk = require("chalk")
const app= express();
const port= 3000


app.use("/hello?",(req,res)=>{
   res.send("welcome to my webpage")
})


app.use("/hello*o",(req,res)=>{
   res.send("welcome to my webpage")
})
app.use("/hello+o",(req,res)=>{
   res.send("welcome to my webpage")
})

app.use(/\/users\/.*/, (req, res) => {
   res.send("welcome to my webpage");
 });

app.use("/hello()",(req,res)=>{
   res.send("welcome to my webpage")
})

app.get("/home/:Userid/:name?",(req,res)=>{
console.log(req.params.Userid)
   res.send("hello ")
})


app.get('/search/', (req, res) => {
   const searchTerm = req.query.num
   res.send(`here is your book ${searchTerm}`)
   });

app.listen(port,()=>{
    console.log(chalk.blue.bgRed.bold(`Server successfully started at ${port}`))
}); 