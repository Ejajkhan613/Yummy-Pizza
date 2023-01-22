// Importing Modules
const express = require("express");
require('dotenv').config();

// Importing Custom Modules
const { AdminModel } = require("../models/admin");


// Secret Key for Token Generation
const secretKey = process.env.secret_key;



// checking for email while registration.
// if email is already present in the Database then user is already have an account
// else if email is not present going forward

const check_admin_email = async (req, res, next) => {
    let { email, key } = req.body;
    try {
        if (key == secretKey) {
            let data = await AdminModel.find({ "email": email });
            if (data.length == 0) {
                next();
            } else {
                res.send([{ "message": `${email} is already registered please login` }]);
            }
        } else {
            res.send([{ "message": "Admin Key not Valid" }]);
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
};


// Exporting Modules
module.exports = { check_admin_email };