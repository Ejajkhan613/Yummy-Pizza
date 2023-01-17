// Importing Modules
const mongoose = require("mongoose");


// Users Address Schema
const productSchema = mongoose.Schema({
    "price": Number,
    "name": String,
    "description": String,
    "image": String,
    "size": String,
    "category": String
});



// Users Address Model
const ProductModel = mongoose.model("product", productSchema);


// Exporting Model
module.exports = { ProductModel };