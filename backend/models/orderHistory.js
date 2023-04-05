// Importing required modules
const mongoose = require("mongoose");

// Defining the schema for a user order
const orderSchema = mongoose.Schema({
    "username": String, // The username of the user who placed the order
    "product_list": Array, // An array of products ordered
    "mode": String, // The payment mode used for the order (e.g. cash on delivery, credit card, etc.)
    "date": {
        type: Date,
        default: Date.now // The date the order was placed, defaults to the current date
    }
});

// Creating a model for the order based on the order schema
const OrderModel = mongoose.model("order", orderSchema);

// Exporting the OrderModel for use in other files
module.exports = { OrderModel };
