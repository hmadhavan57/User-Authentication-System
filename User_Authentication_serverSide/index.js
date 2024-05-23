const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: ["http://localhost:5173"], // Allow requests from this origin
    methods: ["GET", "POST"], // Allow these HTTP methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse cookies
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/user");

// Middleware to verify JWT token and user role
const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
        return res.json("Token not available");
    }
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.json("Error with token");
        }
        if (decoded.role === "admin" || decoded.role === "visitor") {
            next(); // User is authorized, proceed to next middleware/route handler
        } else {
            res.json("Unauthorized");
        }
    });
};

// Protected route for the dashboard
app.get('/dashboard', verifyUser, (req, res) => {
    return res.json("Success");
});

// Protected route for the home page
app.get('/home', verifyUser, (req, res) => {
    return res.json("Success");
});

// Route for user login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.json("No user exists");
            }
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: "1d" });
                    res.cookie("token", token); // Set token in cookies
                    return res.json({ Status: "Success", role: user.role });
                } else {
                    console.log("Wrong Password");
                    return res.json("Wrong Password");
                }
            });
        })
        .catch(err => res.json("Error finding user: " + err));
});

// Route for user registration
app.post('/register', (req, res) => {
    const { name, mobile, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, mobile, email, password: hash })
                .then(user => res.json("Success"))
                .catch(err => res.json("Error creating user: " + err));
        })
        .catch(err => res.json("Error hashing password: " + err));
});

// Route to handle forgotten password
app.post('/forget-password', (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User does not exist" });
            }
            const token = jwt.sign({ id: user._id }, "jwt-secret-key", { expiresIn: "1d" });
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "hmadhavan57@gmail.com",//Admin Email id should be used here for sending email to client
                    pass: "skrh emhm vbki bojt"//Password of the Admin email
                }
            });

            var mailOptions = {
                from: "hmadhavan57@gmail.com",//sender: Admin email id
                to: email,//reciever: the client email id
                subject: 'Reset your Password',
                text: `http://localhost:5173/reset_password/${user._id}/${token}`// If you want to add something to content of the mail , add here.
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("Email sending error: ", error);
                    return res.send({ Status: "Error sending email" });
                } else {
                    console.log("Email sent: " + info.response);
                    return res.send({ Status: "Success" });
                }
            });
        })
        .catch(err => {
            console.log("Error finding user: ", err);
            return res.json("Error finding user: " + err);
        });
});

// Route to handle password reset
app.post('/reset_password/:id/:token', (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" });
        }
        bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate(id, { password: hash })
                    .then(() => res.send({ Status: "Success" }))
                    .catch(err => res.send({ Status: "Error updating password: " + err }))
            })
            .catch(err => res.send({ Status: "Error hashing password: " + err }))
    });
});

// Redirect route for password reset link
app.get('/reset_password/:id/:token', (req, res) => {
    res.redirect(`http://localhost:5173/reset_password/${req.params.id}/${req.params.token}`);
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running");
});
