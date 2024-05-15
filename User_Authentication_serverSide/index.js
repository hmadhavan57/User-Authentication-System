const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/User")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post("/login" , (req,res) => {
    const {email,password} = req.body;
    UserModel.findOne({email: email})
    .then (users => {
        if(users){
            if(users.password === password){
                res.json("Success")
           }
           else{
            res.json("Password is wrong")
           }
        }
        else{
            res.json("No user is existed")
        }
    })
})

app.post('/register' , (req , res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


app.listen(3001,() =>{
    console.log("server is running")
})