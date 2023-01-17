// Importing Modules
const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Salt Round for Password Encryption
const saltRounds = 6;


// Secret Key for Token Generation
const secretKey = "givemybestinthisproject";


// Importing Custom Modules
const { AdminModel } = require("../models/admin")
const { UsersModel } = require("../models/users");
const { check_user_email } = require("../middlewares/emailcheck.signup");
const { check_user_username } = require("../middlewares/usernamecheck.signup");
const { check_user_mobile } = require("../middlewares/mobilecheck.signup");

// Separating Routes
const userRoute = express.Router();


// Middlewares
userRoute.use(express.json());


// GET All User Details (Only for Admin Purpose)
userRoute.get("/show", (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    res.send(data);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


// Users Registration Route
userRoute.post("/register", check_user_email, check_user_username, check_user_mobile, async (req, res) => {
    let { username, email, mobile, password } = req.body;
    try {
        bcrypt.hash(password, saltRounds, async (err, hashed_pass) => {
            if (hashed_pass) {
                // Generating Token
                var token = jwt.sign({ email, mobile }, secretKey, { expiresIn: '24h' });

                // Storing Data and sending response
                let data = new UsersModel({ username, email, mobile, "password": hashed_pass });
                await data.save();
                res.send([{ "message": `${data.username} is successfully registered` }, { "username": username, "Access_Token": token }]);
            } else {
                res.send([{ "message": "Error while Hashing Password" }]);
            }
        });
    } catch (error) {
        res.send([{ "message": "Error while Registering" }]);
    }
});


// Users Login Route
userRoute.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let check = await UsersModel.find({ "email": email });
        if (check.length == 1) {

            bcrypt.compare(password, check[0].password, async (err, result) => {
                if (result) {
                    // Generating Token
                    var token = jwt.sign({ email, "mobile": check[0].mobile }, secretKey, { expiresIn: '24h' });

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

// show User Detail
userRoute.get("/admin/show", (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let showUsers = await UsersModel.find();
                    res.send(showUsers);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


// Add User Detail
userRoute.post("/admin/add", (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let addUser = new UsersModel(req.body);
                    await addUser.save();
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


// Exporting userRoute
module.exports = { userRoute };
