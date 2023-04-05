// Importing Modules
const express = require("express"); // importing Express module

// Importing Custom Modules
const { UsersModel } = require("../models/users"); // importing UsersModel from users.js module

// Middleware function to check if a user with the given email already exists in the database
const check_user_email = async (req, res, next) => {
    let { email } = req.body; // getting email from request body
    try {
        let data = await UsersModel.find({ "email": email }); // finding if a user with the given email already exists in the database
        if (data.length == 0) { // if no user is found with the given email, then proceed to the next middleware
            next();
        } else {
            res.send([{ "message": `${email} is already registered` }]); // if a user is found with the given email, then send a response indicating that the email already exists and a different email should be provided
        }
    } catch (error) {
        res.send([{ "message": "Error while checking Email" }]); // if an error occurs while searching for the user with the given email, then send a response indicating that an error occurred while checking the email
    }
};

// Exporting Modules
module.exports = { check_user_email }; // exporting the check_user_email middleware function for other modules to use
