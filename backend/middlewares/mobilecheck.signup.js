const express = require("express");

const { UsersModel } = require("../models/users");

const check_user_mobile = async (req, res, next) => {
    let { mobile } = req.body;
    try {
        let data = await UsersModel.find({ "mobile": mobile });
        if (data.length == 0) {
            next();
        } else {
            res.send([{ "message": `Mobile Number is already registered` }]);
        }
    } catch (error) {
        res.send([{ "message": "Error while checking mobile" }]);
    }
};

module.exports = { check_user_mobile };
