// Importing Modules
const express = require("express");

// Importing Custom Modules
const { UsersModel } = require("../models/users");



// checking for email while registration.
// if email is already present in the Database then user is already have an account
// else if email is not present going forward

const check_user_email = async (req, res, next) => {
    let { email } = req.body;
    try {
        let data = await UsersModel.find({ "email": email });
        if (data.length == 0) {
            next();
        } else {
            res.send([{ "message": `${email} is already registered` }]);
        }
    } catch (error) {
        res.send([{ "message": "Error while checking Email" }]);
    }
};


// Exporting Modules
module.exports = { check_user_email };