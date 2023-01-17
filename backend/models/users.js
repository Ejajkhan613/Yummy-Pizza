// Importing Modules
const mongoose = require("mongoose");


// Users Registration Schema
const userSchema = mongoose.Schema({
    "username": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "mobile": {
        type: Number,
        required: true
    },
    "password": {
        type: String,
        required: true
    }
});



// Users Registration Model
const UsersModel = mongoose.model("user", userSchema);


// Exporting Model
module.exports = { UsersModel };