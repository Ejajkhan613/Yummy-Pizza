const express = require("express");

const { AdminModel } = require("../models/admin");

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

module.exports = { check_admin_username };
