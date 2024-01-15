const fs = require("fs")
const express = require("express")
const mongoose = require("mongoose")
const path = require('path');

const app = express();
const port = 3000;

const User = require("./model/user")

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/UserRegisterDB").then(()=>{
    console.log("Database connected")
}).catch((e)=>{
    console.log(e)
    console.log("Database can't be connected")
})

app.post("/", async(req, res)=>{
    const userData= new User(req.body)
    await userData.save()
    let a = fs.readFileSync(path.join(__dirname, 'public', 'submit.html'))
    res.send(a.toString())
})

app.get("/", (req,res)=>{
    let a = fs.readFileSync(path.join(__dirname, 'public', 'reg.html'))
    res.send(a.toString())
})

app.listen(port, () => {
    console.log('Server is running at http://localhost:'+port);
    console.log("\npress ctrl+C to stop the server")
});

