// Importing required modules
const mongoose = require("mongoose");

// Users Registration Schema: Defines the structure of the User's registration data in MongoDB
const userSchema = mongoose.Schema({
    "username": {
        type: String,
        required: true // Ensures that username is mandatory
    },
    "email": {
        type: String,
        required: true // Ensures that email is mandatory
    },
    "mobile": {
        type: Number,
        required: true // Ensures that mobile number is mandatory
    },
    "password": {
        type: String,
        required: true // Ensures that password is mandatory
    }
});

// Users Registration Model: Defines a model for interacting with User's registration data in MongoDB
const UsersModel = mongoose.model("user", userSchema);

// Exporting Model: Exports the UsersModel for use in other files
module.exports = { UsersModel };
