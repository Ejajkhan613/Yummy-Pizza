// Importing Modules
const express = require("express");

// Importing Custom Modules
const { UsersModel } = require("../models/users");



// checking for username while registration.
// if username is already present in the Database then ask for user to provide other username
// else if username is not present going forward

const check_user_username = async (req, res, next) => {
    let { username } = req.body;
    try {
        let data = await UsersModel.find({ "username": username });
        if (data.length == 0) {
            next();
        } else {
            res.send([{ "message": `this username is already registered please provide another` }]);
        }
    } catch (error) {
        res.send([{ "message": "Error while checking Username" }]);
    }
};


// Exporting Modules
module.exports = { check_user_username };