const express = require("express");
var jwt = require('jsonwebtoken');
require('dotenv').config();

const { CartModel } = require("../models/cart");
const { ProductModel } = require("../models/products");
const { UsersModel } = require("../models/users");
const { AdminModel } = require("../models/admin");

const cartRoute = express.Router();

const secretKey = process.env.SECRET_KEY;

cartRoute.use(express.json());


// User API's
// GET Product Details Route
cartRoute.get("/", async (req, res) => {
    let { username } = req.headers;
    try {
        let checking = await CartModel.find({ "username": username });
        res.send(checking);
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});


// Add Product Details in Cart
cartRoute.post("/add", async (req, res) => {
    let { username } = req.body;
    let { id } = req.body;
    try {
        let checking = await UsersModel.find({ "username": username });
        if (checking.length == 1) {
            let gettingProduct = await ProductModel.findById({ "_id": id });
            if (gettingProduct._id) {

                let checkproduct = await CartModel.find({ "product_id": id });
                if (checkproduct.length == 0) {
                    let data = new CartModel({ "username": username, "price": gettingProduct.price, "name": gettingProduct.name, "description": gettingProduct.description, "image": gettingProduct.image, "size": gettingProduct.size, "category": gettingProduct.category, "product_id": id, "quantity": 1 });
                    await data.save();
                    res.send([{ "message": "Product Added to Cart" }])
                } else {
                    res.send([{ "message": "Already in Cart" }])
                }
            } else {
                res.send([{ "message": "Not Authorized" }]);
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
cartRoute.patch("/update", async (req, res) => {
    let { username } = req.body;
    let { id } = req.body;
    let payload = req.body;
    try {
        let checking = await UsersModel.find({ "username": username });
        if (checking.length == 1) {
            if (payload.quantity == 0) {
                let data = await CartModel.findByIdAndDelete({ "_id": id }, payload);
                res.send([{ "message": "Item Deleted" }, data]);
            } else {
                let data = await CartModel.findByIdAndUpdate({ "_id": id }, payload);
                res.send([{ "message": "Item Updated" }, data]);
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});





// Deleting Product from Cart
cartRoute.post("/add", async (req, res) => {
    let { username } = req.headers;
    let { _id } = req.body;
    try {
        let checking = await UsersModel.find({ "username": username });
        if (checking.length == 1) {
            let gettingProduct = await ProductModel.findById({ "_id": _id });
            if (gettingProduct.name) {
                let data = new CartModel({ "username": username, "price": gettingProduct.price, "name": gettingProduct.name, "description": gettingProduct.description, "image": gettingProduct.image, "size": gettingProduct.size, "category": gettingProduct.category, "product_id": _id });
                await data.save();
                res.send([{ "message": "Product Deleted from Cart" }])
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    } catch (error) {
        console.log(error)
        res.send([{ "message": "Something Went Wrong" }]);
    }
});










// Admin API's

// Add new Product Details
cartRoute.post("/add", (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let addedProduct = new CartModel(req.body);
                    await addedProduct.save();
                    res.send([{ "message": "Product Added" }, addedProduct]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


// Update Product Detail
cartRoute.patch("/update", (req, res) => {
    let { _id } = req.body;
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let updatedProduct = await CartModel.findByIdAndUpdate({ "_id": _id }, req.body)
                    res.send([{ "message": "Product Updated" }, req.body]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


// delete Product Detail
cartRoute.delete("/delete", (req, res) => {
    let { _id } = req.body;
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let deleteProduct = await CartModel.findByIdAndDelete({ "_id": _id })
                    res.send([{ "message": "Product Deleted" }, deleteProduct]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})


module.exports = { cartRoute };
