const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/User")
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post("/login" , (req,res) => {
    const {email,password} = req.body;
    UserModel.findOne({email: email})
    .then (user => {
        if(user){
           bcrypt.compare(password, user.password , (response) => {
            if(response){
                res.json("Success")
            }
            else{
                res.json("Wrong Password")
            }
           })
        }
        else{
            res.json("No user is existed")
        }
    })
})

app.post('/register' , (req , res) => {
    const {name,mobile,email,password} = req.body;
    bcrypt.hash(password , 10)
    .then(hash =>{
        UserModel.create({name,mobile,email,password: hash})
        .then(user => res.json(user))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))
   
})


app.listen(3001,() =>{
    console.log("server is running")
})