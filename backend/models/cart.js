// Importing required modules
const mongoose = require("mongoose");

// Defining the schema for the user cart
const cartSchema = mongoose.Schema({
    "price": Number, // The price of the product in the cart
    "name": String, // The name of the product in the cart
    "description": String, // The description of the product in the cart
    "image": String, // The image of the product in the cart
    "size": String, // The size of the product in the cart
    "category": String, // The category of the product in the cart
    "product_id": String, // The ID of the product in the cart
    "username": String, // The username of the user who added the product to the cart
    "quantity": {
        type: Number,
        default: 1 // The quantity of the product in the cart, defaults to 1
    },
    "date": {
        type: Date,
        default: Date.now // The date the product was added to the cart, defaults to the current date
    }
});

// Creating a model for the user cart based on the cart schema
const CartModel = mongoose.model("cart", cartSchema);

// Exporting the CartModel for use in other files
module.exports = { CartModel };
