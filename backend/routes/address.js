// Importing Modules
const express = require("express");  // Importing express module
const jwt = require("jsonwebtoken");  // Importing jsonwebtoken module
require('dotenv').config();  // Loading .env file for environment variables

// Importing Custom Modules
const { AddressModel } = require("../models/address");  // Importing AddressModel from address.js file
const { UsersModel } = require("../models/users");  // Importing UsersModel from users.js file
const { AdminModel } = require("../models/admin");  // Importing AdminModel from admin.js file

// Separating Routes
const addressRoute = express.Router();  // Creating a new router instance to handle address related routes

// Secret Key
const secretKey = process.env.secret_key;  // Getting the secret key from the environment variable

// Middlewares
addressRoute.use(express.json());  // Using middleware to parse the request body as JSON

// For Users
// GET Address Details Route
addressRoute.get("/get", async (req, res) => {
    let { username } = req.headers;  // Extracting the username from request headers
    try {
        let data = await AddressModel.find({ "username": username });  // Finding address details for given username
        res.send(data);  // Sending the address details in response
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);  // Handling error if something goes wrong
    }
});

// Add Address Details Route
addressRoute.post("/add", async (req, res) => {
    let { username } = req.body;  // Extracting the username from request body
    let address_details = req.body;  // Extracting the address details from request body
    try {
        let getting_data = await UsersModel.find({ "username": username });  // Finding user with given username
        if (getting_data.length >= 1) {
            let data = new AddressModel(address_details);  // Creating a new AddressModel instance with address details
            await data.save()  // Saving the address details to the database
            res.send([{ "message": "Address Saved" }, data]);  // Sending the success message along with the saved address details
        } else {
            res.send([{ "message": "Not Authorized Please Login" }]);  // Handling error if user is not authorized
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);  // Handling error if something goes wrong
    }
});

// Update Address Details Route
addressRoute.patch("/update", async (req, res) => {
    let { username } = req.body;  // Extracting the username from request body
    try {
        let data = await AddressModel.find({ "username": username });  // Finding address details for given username
        if (data.length >= 1) {
            let new_address = await AddressModel.findByIdAndUpdate({ "_id": data[0]._id }, req.body);  // Updating the address details in the database
            res.send({ "message": "Address Updated" }, new_address);  // Sending the success message along with the updated address details
        } else {
            res.send([{ "message": "Not an Authorized User" }]);  // Handling error if user is not authorized
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);  // Handling error if something goes wrong
    }
});







// Only for Admin Purpose

// GET All Users Address Detail
addressRoute.get("admin/show", (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let detail = await AddressModel.find();
                    res.send(detail);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})

// Update Users Address Detail
addressRoute.patch("admin/update", (req, res) => {
    let token = req.headers.authorization;
    let { _id } = req.body;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let changes = await AddressModel.findByIdAndUpdate({ "_id": _id }, req.body);
                    res.send([{ "message": "Address Updated" }, changes]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


// Delete Users Address Detail
addressRoute.delete("admin/delete", (req, res) => {
    let token = req.headers.authorization;
    let { _id } = req.body;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let changes = await AddressModel.findByIdAndDelete({ "_id": _id });
                    res.send([{ "message": "Address Deleted" }, changes]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    })
})


// Exporting addressRoute
module.exports = { addressRoute };
