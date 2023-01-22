// Importing Modules
const express = require("express");

// Importing Custom Modules
const { UsersModel } = require("../models/users");





const check_user_mobile = async (req, res, next) => {
    let { mobile } = req.body;
    try {
        let data = await UsersModel.find({ "mobile": mobile });
        console.log(data)
        if (data.length == 0) {
            next();
        } else {
            res.send([{ "message": `Mobile Number is already registered` }]);
        }
    } catch (error) {
        res.send([{ "message": "Error while checking mobile" }]);
    }
};


// Exporting Modules
module.exports = { check_user_mobile };