// Importing Modules
const express = require("express"); // importing Express module
require('dotenv').config(); // importing dotenv module for environment variable management

// Importing Custom Modules
const { AdminModel } = require("../models/admin"); // importing AdminModel from admin.js module

// Secret Key for Token Generation
const secretKey = process.env.secret_key; // getting secret key from environment variable

// Middleware function to check if an admin with the given email already exists in the database
const check_admin_email = async (req, res, next) => {
    let { email, key } = req.body; // getting email and key from request body
    try {
        if (key == secretKey) { // checking if the key provided by the user matches the secret key
            let data = await AdminModel.find({ "email": email }); // finding if an admin with the given email already exists in the database
            if (data.length == 0) { // if no admin is found with the given email, then proceed to the next middleware
                next();
            } else {
                res.send([{ "message": `${email} is already registered please login` }]); // if an admin is found with the given email, then send a response indicating that the email is already registered
            }
        } else {
            res.send([{ "message": "Admin Key not Valid" }]); // if the key provided by the user does not match the secret key, then send a response indicating that the key is not valid
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]); // if an error occurs while searching for the admin with the given email, then send a response indicating that something went wrong
    }
};

// Exporting Modules
module.exports = { check_admin_email }; // exporting the check_admin_email middleware function for other modules to use
