// Importing required modules
const mongoose = require("mongoose");

// Defining the schema for admin registration
const adminSchema = mongoose.Schema({
    "username": {
        type: String,
        required: true // The username field is required for registration
    },
    "email": {
        type: String,
        required: true // The email field is required for registration
    },
    "mobile": {
        type: Number,
        required: true // The mobile field is required for registration
    },
    "password": {
        type: String,
        required: true // The password field is required for registration
    }
});

// Creating a model for admin registration based on the admin schema
const AdminModel = mongoose.model("admin", adminSchema);

// Exporting the AdminModel for use in other files
module.exports = { AdminModel };
