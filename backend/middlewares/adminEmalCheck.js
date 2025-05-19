const express = require("express");
require('dotenv').config();

const { AdminModel } = require("../models/admin");

const secretKey = process.env.SECRET_KEY;

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

module.exports = { check_admin_email };
