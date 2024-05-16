const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/user");

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("The token was not available");
    } else {
        jwt.verify(token, "jwt-secert-key", (err, decoded) => {
            if (err) return res.json("Token is wrong")
            next();
        })
    }
}

app.get('./home', verifyUser, (req, res) => {
    return res.json("Success")
})


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: "1d" })
                        res.cookie("token", token);
                        res.json("Success")
                    } else {
                        res.json("Wrong Password")
                    }
                })
            } else {
                res.json("No user is existed")
            }
        })
})


app.post('/register', (req, res) => {
    const { name, mobile, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, mobile, email, password: hash })
                .then(user => res.json(user))
                .catch(err => res.json(err))
        }).catch(err => console.log(err.message))

})


app.listen(3001, () => {
    console.log("server is running")
})