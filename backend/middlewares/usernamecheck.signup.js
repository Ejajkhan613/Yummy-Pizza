const express = require("express");

const { UsersModel } = require("../models/users");

const check_user_username = async (req, res, next) => {
    let { username } = req.body;
    try {
        let data = await UsersModel.find({ "username": username });
        if (data.length == 0) {
            next();
        } else {
            res.send([{ "message": `This username is already registered. Please provide another.` }]);
        }
    } catch (error) {
        res.send([{ "message": "Error while checking username" }]);
    }
};

module.exports = { check_user_username };
