// Importing Modules
const express = require("express"); // importing Express module

// Importing Custom Modules
const { AdminModel } = require("../models/admin"); // importing AdminModel from admin.js module

// Middleware function to check if an admin with the given username already exists in the database
const check_admin_username = async (req, res, next) => {
    let { username } = req.body; // getting username from request body
    try {
        let data = await AdminModel.find({ "username": username }); // finding if an admin with the given username already exists in the database
        if (data.length == 0) { // if no admin is found with the given username, then proceed to the next middleware
            next();
        } else {
            res.send([{ "message": `${username} already exist prove different Username` }]); // if an admin is found with the given username, then send a response indicating that the username already exists and a different username should be provided
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]); // if an error occurs while searching for the admin with the given username, then send a response indicating that something went wrong
    }
};

// Exporting Modules
module.exports = { check_admin_username }; // exporting the check_admin_username middleware function for other modules to use
