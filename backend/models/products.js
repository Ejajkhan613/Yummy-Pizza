// Importing required modules
const mongoose = require("mongoose");

// Defining the schema for a product
const productSchema = mongoose.Schema({
    "price": Number, // The price of the product
    "name": String, // The name of the product
    "description": String, // The description of the product
    "image": String, // The image URL of the product
    "size": String, // The size of the product (if applicable)
    "category": String // The category of the product (e.g. electronics, clothing, etc.)
});

// Creating a model for the product based on the product schema
const ProductModel = mongoose.model("product", productSchema);

// Exporting the ProductModel for use in other files
module.exports = { ProductModel };
