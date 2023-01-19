// Importing Modules
const express = require("express");
const jwt = require("jsonwebtoken");


// Importing Custom Modules
const { AddressModel } = require("../models/address");
const { UsersModel } = require("../models/users");
const { AdminModel } = require("../models/admin");

// Separating Routes
const addressRoute = express.Router();


// Middlewares
addressRoute.use(express.json());


// For Users
// GET Address Details Route
addressRoute.get("/get", async (req, res) => {
    let { username } = req.headers;
    try {
        let data = await AddressModel.find({ "username": username });
        res.send(data);
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});


// Add Address Details Route
addressRoute.post("/add", async (req, res) => {
    let { username } = req.body;
    let address_details = req.body;
    try {
        let getting_data = await UsersModel.find({ "username": username });
        if (getting_data.length >= 1) {
            let data = new AddressModel(address_details);
            await data.save()
            res.send([{ "message": "Address Saved" }, data]);
        } else {
            res.send([{ "message": "Not Authorized Please Login" }]);
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});



// Update Address Details Route
addressRoute.patch("/update", async (req, res) => {
    let { username } = req.body;
    try {
        let data = await AddressModel.find({ "username": username });
        if (data.length >= 1) {
            let new_address = await AddressModel.findByIdAndUpdate({ "_id": data[0]._id }, req.body);
            res.send({ "message": "Address Updated" }, new_address);
        } else {
            res.send([{ "message": "Not an Authorized User" }]);
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
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
