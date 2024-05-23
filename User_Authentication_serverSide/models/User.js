const mongoose = require("mongoose");

// Define the schema for the user collection
const userSchema = new mongoose.Schema({
    name: String, // User's name
    mobile: Number, // User's mobile number
    email: String, // User's email address
    password: String, // User's hashed password
    role: {
        type: String, // User's role (e.g., admin, visitor) Admin can be changed as directly in the database
        default: "visitor" // Default role is 'visitor'
    }
});

// Create a model from the schema
const UserModel = mongoose.model("user", userSchema);

// Export the model to be used in other parts of the application
module.exports = UserModel;
