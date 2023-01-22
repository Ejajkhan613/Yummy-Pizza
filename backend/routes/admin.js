// Importing Modules
const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();

// Salt Round for Password Encryption
const saltRounds = 6;


// Secret Key for Token Generation
const secretKey = process.env.secret_key;


// Importing Custom Modules
const { AdminModel } = require("../models/admin");
const { check_admin_email } = require("../middlewares/adminEmalCheck");
const { check_admin_username } = require("../middlewares/adminUsernameCheck");
const { check_admin_mobile } = require("../middlewares/adminMobileCheck");

// Separating Routes
const adminRoute = express.Router();


// Middlewares
adminRoute.use(express.json());




// For Users
// Users Registration Route
adminRoute.post("/register", check_admin_email, check_admin_username, check_admin_mobile, async (req, res) => {
    let { username, email, mobile, password, key } = req.body;
    try {
        if (key == secretKey) {
            bcrypt.hash(password, saltRounds, async (err, hashed_pass) => {
                if (hashed_pass) {
                    // Generating Token
                    var token = jwt.sign({ email, mobile, "password": hashed_pass }, secretKey, { expiresIn: '24h' });

                    // Storing Data and sending response
                    let data = new AdminModel({ username, email, mobile, "password": hashed_pass });
                    await data.save();
                    res.send([{ "message": `registration successfull` }, { "username": username, "Access_Token": token }]);
                } else {
                    res.send([{ "message": "Something Went Wrong" }]);
                }
            });
        } else {
            res.send([{ "message": "Wrong Admin Key" }]);
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});


// Users Login Route
adminRoute.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let check = await AdminModel.find({ "email": email });
        if (check.length == 1) {

            bcrypt.compare(password, check[0].password, async (err, result) => {
                if (result) {
                    // Generating Token
                    var token = jwt.sign({ email, "mobile": check[0].mobile, "password": check[0].password }, secretKey, { expiresIn: '24h' });

                    // Sending Response
                    res.send([{ "message": `${check[0].username} is successfully logged in` }, { "username": check[0].username, "Access_Token": token }]);
                } else {
                    res.send([{ "message": "Wrong Credentials" }]);
                }
            });
        } else {
            res.send([{ "message": "Wrong Credentials" }]);
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});






// Only for Admin Purpose

// GET All Admin Details
adminRoute.get("/show", async (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let allAdmins = await AdminModel.find();
                    res.send(allAdmins);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


// GET Admin Detail by ID
adminRoute.get("/find", async (req, res) => {
    let token = req.headers.authorization;
    let id = req.headers.id;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let foundAdmin = await AdminModel.findById({ "_id": id });
                    res.send([{ "message": "found" }, foundAdmin]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})




// Update Admin Details by ID
adminRoute.patch("/update", (req, res) => {
    let id = req.headers.id;
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let changes = await AdminModel.findByIdAndUpdate({ "_id": id }, req.body);
                    res.send([{ "message": "Details Updated" }, changes]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


// Delete Admin Details by ID
adminRoute.delete("/delete", (req, res) => {
    let id = req.headers.id;
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let changes = await AdminModel.findByIdAndDelete({ "_id": id });
                    res.send([{ "message": "Details Deleted" }, changes]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


// Exporting adminRoute
module.exports = { adminRoute };
