const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    "username": String,
    "product_list": Array,
    "mode": String,
    "date": {
        type: Date,
        default: Date.now
    }
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };
