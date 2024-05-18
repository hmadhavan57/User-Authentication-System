const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    password: String,
    role: {
        type: String,
        default: "visitor"
    }
})

const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel