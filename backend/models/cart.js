const mongoose = require("mongoose");

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

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
