// Importing Modules
const express = require("express");
var jwt = require('jsonwebtoken');
require('dotenv').config();

// Importing Custom Modules
const { ProductModel } = require("../models/products");
const { AdminModel } = require("../models/admin");

// Separating Routes
const productRoute = express.Router();

// Secret key
const secretKey = process.env.secret_key;


// Middlewares
productRoute.use(express.json());


// GET Product Details Route
productRoute.get("/", async (req, res) => {
    let categ = req.query.category;
    try {
        let data = await ProductModel.find({ "category": categ });
        res.send(data);
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});








// Only for Admin Purpose

// Add new Product Details
productRoute.get("/admin/find", async (req, res) => {
    let token = req.headers.authorization;
    let category = req.headers.category;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let findByCategory = await ProductModel.find({ "category": category });
                    res.send(findByCategory);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})



// Add new Product Details
productRoute.post("/admin/add", async (req, res) => {
    let token = req.headers.authorization;
    let payload = req.body;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let addedProduct = new ProductModel(payload);
                    await addedProduct.save();
                    res.send([{ "message": "Product Added" }]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    });
})



// Show Product Details
productRoute.get("/admin/show", async (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let showProduct = await ProductModel.find();
                    res.send(showProduct);
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
productRoute.patch("/admin/update", async (req, res) => {
    let { _id } = req.body;
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let updatedProduct = await ProductModel.findByIdAndUpdate({ "_id": _id }, req.body)
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
productRoute.delete("/admin/delete", async (req, res) => {
    let id  = req.headers.id;
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    await ProductModel.findByIdAndDelete({ "_id": id })
                    res.send([{ "message": "Product Deleted" }]);
                } else {
                    res.send([{ "message": "Not Authorized" }]);
                }
            } else {
                res.send([{ "message": "Not Authorized" }]);
            }
        } else {
            res.send([{ "message": "Not Authorized" }]);
        }
    })
})



// Exporting product Route
module.exports = { productRoute };
