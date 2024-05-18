const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')


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
            if (err) {
                return res.json("Error with token")
            }
            else {
                if (decoded.role === "admin") {
                    next();
                } else {
                    return res.json("Not admin")
                }
            }

        })
    }
}

app.get('./dashboard', verifyUser, (req, res) => {
    return res.json("Success")
})


app.post('/reset-password/:id/:token', (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" })
        } else {
            bcrypt.hash(password, 10)
                .then(hash => {
                    UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
                        .then(u => res.send({ Status: "Success" }))
                        .catch(err => res.send({ Status: err }))
                })
                .catch(err => res.send({ Status: err }))
        }
    })
})


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
                        const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: "1d" })
                        res.cookie("token", token);
                        return res.json({ Status: "Success", role: user.role })
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
                .then(user => res.json("Succes"))
                .catch(err => res.json(err))
        }).catch(err => console.log(err))

})


app.listen(3001, () => {
    console.log("server is running")
})


app.post('/forget-password', (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User is not existed" })
            }
            const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hmadhavan57@gmail.com',
                    pass: 'xovf zlhy ufhw cpbx'
                }
            });

            var mailOptions = {
                from: 'hmadhavan57@gmail.com',
                to: email,
                subject: 'Reset your Password',
                text: `http://localhost:3001/reset-password/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.send({ Status: "Error sending email" });
                } else {

                    return res.send({ Status: "Success" })
                }
            });
        })
})