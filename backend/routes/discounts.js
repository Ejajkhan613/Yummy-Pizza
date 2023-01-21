// Importing Modules
const express = require("express");


// Importing Custom Modules
const { UsersModel } = require("../models/users");
const { DiscountModel } = require("../models/discount");
const { AdminModel } = require("../models/admin");

// Separating Routes
const discountRoute = express.Router();


// Middlewares
discountRoute.use(express.json());


// For Users
// GET Discount Route
discountRoute.get("/", async (req, res) => {
    let { username, name } = req.headers;
    try {
        let data = await UsersModel.find({ "username": username });
        if (data.length == 1) {
            let disc = await DiscountModel.find({ "name": name })
            if (disc.length != 0) {
                res.send([{ "message": "Discount Applied" }, disc])
            } else {
                res.send([{ "message": "Coupon Not Valid" }]);
            }
        } else {
            res.send([{ "message": "Login First" }])
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});


// For Users
// GET Discount Route
discountRoute.post("/add", async (req, res) => {
    let { username } = req.headers;
    let { name, price } = req.body;
    try {
        let data = await AdminModel.find({ "username": username });
        if (data.length == 1) {
            let disc = new DiscountModel({ "name": name, "price": price })
            await disc.save();
            res.send(disc)
        }
        res.send(data);
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});


module.exports = { discountRoute };