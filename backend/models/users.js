const mongoose = require("mongoose");

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

const UsersModel = mongoose.model("user", userSchema);

module.exports = { UsersModel };
