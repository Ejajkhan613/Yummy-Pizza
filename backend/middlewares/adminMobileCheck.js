const express = require("express");

const { AdminModel } = require("../models/admin");

const check_admin_mobile = async (req, res, next) => {
    let { mobile } = req.body;
    try {
        let data = await AdminModel.find({ "mobile": mobile });
        if (data.length == 0) {
            next();
        } else {
            res.send([{ "message": `Mobile Number already registered Please Login` }]);
        }

    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
};

module.exports = { check_admin_mobile };
