// Importing Modules
const express = require("express");

// Importing Custom Modules
const { AdminModel } = require("../models/admin");



// checking for username while registration.
// if username is already present in the Database then username should be different
// else if username is not present going forward

const check_admin_username = async (req, res, next) => {
    let { username } = req.body;
    try {
        let data = await AdminModel.find({ "username": username });
        if (data.length == 0) {
            next();
        } else {
            res.send([{ "message": `${username} already exist prove different Username` }]);
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
};


// Exporting Modules
module.exports = { check_admin_username };