const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    "price": Number,
    "name": String,
    "description": String,
    "image": String,
    "size": String,
    "category": String
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
