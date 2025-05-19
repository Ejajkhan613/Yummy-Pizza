const express = require("express");
var jwt = require('jsonwebtoken');
require('dotenv').config();


const { OrderModel } = require("../models/orderHistory");
const { CartModel } = require("../models/cart");
const { UsersModel } = require("../models/users");
const { AdminModel } = require("../models/admin");

const orderRoute = express.Router();

const secretKey = process.env.SECRET_KEY;


orderRoute.use(express.json());


// GET Product Details Route
orderRoute.get("/", async (req, res) => {
    let { username } = req.headers;
    try {
        let checking = await OrderModel.find({ "username": username });
        res.send(checking);
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});


// Add Product Details in Cart
orderRoute.post("/add", async (req, res) => {
    let { username, mode } = req.headers;
    try {
        let checking = await UsersModel.find({ "username": username });
        if (checking.length == 1) {
            let gettingCart = await CartModel.find({ "username": username });
            if (gettingCart.length == 0) {
                res.send([{ "message": "Please add some Product first" }])
            } else {
                let data = new OrderModel({ "username": username, "mode": mode, "product_list": gettingCart });
                await data.save();
                await CartModel.deleteMany({ "username": username })
                res.send([{ "message": "Order Confirmed" }])
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    } catch (error) {
        console.log(error)
        res.send([{ "message": "Something Went Wrong" }]);
    }
});


// Update Product Details in Cart
orderRoute.patch("/update", async (req, res) => {
    let { username } = req.body;
    let { id } = req.body;
    let payload = req.body;
    try {
        let checking = await UsersModel.find({ "username": username });
        if (checking.length == 1) {
            if (payload.quantity == 0) {
                let data = await OrderModel.findByIdAndDelete({ "_id": id }, payload);
                res.send([{ "message": "Item Deleted" }, data]);
            } else {
                let data = await OrderModel.findByIdAndUpdate({ "_id": id }, payload);
                res.send([{ "message": "Item Updated" }, data]);
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});









// Admin API's
// Add new Product Details
orderRoute.get("/admin/get", (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let getOrderHistory = await OrderModel.find().sort({"date": -1});
                    res.send(getOrderHistory);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            } else {
                res.send([{ "message": "Not Authorized" }]);
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


module.exports = { orderRoute };
