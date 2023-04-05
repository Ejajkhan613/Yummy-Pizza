// Importing Modules
const express = require("express");
var jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret Key for Token Generation
const secretKey = process.env.secret_key;

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
    // Extracting values from headers
    let { username, name } = req.headers;
    try {
        // Checking if the user is logged in or not
        let data = await UsersModel.find({ "username": username });
        if (data.length == 1) {
            // Finding discount with the given name
            let disc = await DiscountModel.find({ "name": name })
            if (disc.length != 0) {
                // Sending response with the discount information
                res.send([{ "message": "Discount Applied" }, disc])
            } else {
                // Sending response with a message that coupon is not valid
                res.send([{ "message": "Coupon Not Valid" }]);
            }
        } else {
            // Sending response with a message to login first
            res.send([{ "message": "Login First" }])
        }
    } catch (error) {
        // Sending response with a message that something went wrong
        res.send([{ "message": "Something Went Wrong" }]);
    }
});

// For Admin
// Add Discount Route
discountRoute.post("/add", async (req, res) => {
    // Extracting the token from the headers and discount details from the body
    let token = req.headers.authorization;
    let { name, price } = req.body;
    // Verifying the token to check if the user is authorized or not
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            // Finding the admin with the email address stored in the token
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                // Checking if the mobile and password in the token match the one in the database
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    // Creating a new discount object and saving it to the database
                    let addDiscount = new DiscountModel({ "name": name, "price": price });
                    await addDiscount.save();
                    // Sending response with a message that discount has been added
                    res.send([{"message": "Discount Added"},addDiscount]);
                } else {
                    // Sending response with a message that user is not authorized
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            // Sending response with a message that user is not authorized
            res.send([{ "message": "Not Authorized" }]);
        }
    })
})

// Exporting the discountRoute
module.exports = { discountRoute };
