// Importing Modules
const express = require("express");
var jwt = require('jsonwebtoken');


// Importing Custom Modules
const { ProductModel } = require("../models/products");
const { AdminModel } = require("../models/admin");

// Separating Routes
const productRoute = express.Router();

// Secret key
const secretKey = "givemybestinthisproject";


// Middlewares
productRoute.use(express.json());


// GET Product Details Route
productRoute.get("/", async (req, res) => {
    try {
        let data = await ProductModel.find();
        res.send(data);
    } catch (error) {
        res.send([{ "message": "Something Went Wrong" }]);
    }
});





// Only for Admin Purpose

// Add new Product Details
productRoute.post("/add", (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let addedProduct = new ProductModel(req.body);
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
productRoute.patch("/update", (req, res) => {
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
productRoute.delete("/delete", (req, res) => {
    let { _id } = req.body;
    let token = req.headers.authorization;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (decoded) {
            let data = await AdminModel.find({ "email": decoded.email });
            if (data.length == 1) {
                if (decoded.mobile == data[0].mobile && decoded.password == data[0].password) {
                    let deleteProduct = await ProductModel.findByIdAndDelete({ "_id": _id })
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



// Exporting product Route
module.exports = { productRoute };
