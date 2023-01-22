// Importing Modules
const mongoose = require("mongoose");


// Users Registration Schema
const adminSchema = mongoose.Schema({
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
const AdminModel = mongoose.model("admin", adminSchema);


// Exporting Model
module.exports = { AdminModel };