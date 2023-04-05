// Importing required modules
const express = require("express");

// Importing the user model from the custom module
const { UsersModel } = require("../models/users");

// Middleware function to check if the user's mobile number is already registered
const check_user_mobile = async (req, res, next) => {
    // Extracting the mobile number from the request body
    let { mobile } = req.body;
    try {
        // Finding if the mobile number already exists in the user collection
        let data = await UsersModel.find({ "mobile": mobile });
        if (data.length == 0) {
            // If mobile number is not registered, proceed to the next middleware
            next();
        } else {
            // If mobile number is already registered, return a response with error message
            res.send([{ "message": `Mobile Number is already registered` }]);
        }
    } catch (error) {
        // Catching any errors that may occur while checking for the mobile number
        res.send([{ "message": "Error while checking mobile" }]);
    }
};

// Exporting the middleware function to be used in other parts of the application
module.exports = { check_user_mobile };
