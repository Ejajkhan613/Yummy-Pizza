// Importing Modules
const express = require("express"); // importing Express module

// Importing Custom Modules
const { AdminModel } = require("../models/admin"); // importing AdminModel from admin.js module

// Middleware function to check if an admin with the given mobile number already exists in the database
const check_admin_mobile = async (req, res, next) => {
    let { mobile } = req.body; // getting mobile number from request body
    try {
        let data = await AdminModel.find({ "mobile": mobile }); // finding if an admin with the given mobile number already exists in the database
        if (data.length == 0) { // if no admin is found with the given mobile number, then proceed to the next middleware
            next();
        } else {
            res.send([{ "message": `Mobile Number already registered Please Login` }]); // if an admin is found with the given mobile number, then send a response indicating that the mobile number is already registered
        }

    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]); // if an error occurs while searching for the admin with the given mobile number, then send a response indicating that something went wrong
    }
};

// Exporting Modules
module.exports = { check_admin_mobile }; // exporting the check_admin_mobile middleware function for other modules to use
