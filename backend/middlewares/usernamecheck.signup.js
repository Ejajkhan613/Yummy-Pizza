// Importing required modules
const express = require("express");

// Importing custom module for UsersModel
const { UsersModel } = require("../models/users");

// Middleware function to check if the provided username is already registered or not
const check_user_username = async (req, res, next) => {
    let { username } = req.body; // Extracting username from the request body
    try {
        let data = await UsersModel.find({ "username": username }); // Finding user data based on provided username
        if (data.length == 0) { // If no data found, move to next middleware
            next();
        } else { // If data found, send error response with message
            res.send([{ "message": `This username is already registered. Please provide another.` }]);
        }
    } catch (error) { // If error occurs while fetching data, send error response with message
        res.send([{ "message": "Error while checking username" }]);
    }
};

// Exporting the middleware function for use in other files
module.exports = { check_user_username };
