// Importing Modules
const mongoose = require("mongoose");


// Users Cart Schema
const cartSchema = mongoose.Schema({
    "price": Number,
    "name": String,
    "description": String,
    "image": String,
    "size": String,
    "category": String,
    "product_id": String,
    "username": String,
    "quantity": {
        type: Number,
        default: 1
    },
    "date": {
        type: Date,
        default: Date.now
    }
});



// Users Cart Model
const CartModel = mongoose.model("cart", cartSchema);


// Exporting Model
module.exports = { CartModel };