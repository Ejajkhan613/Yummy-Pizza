const express = require("express");

const { UsersModel } = require("../models/users");

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

module.exports = { check_user_email };
