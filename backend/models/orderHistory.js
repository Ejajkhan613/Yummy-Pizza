// Importing Modules
const mongoose = require("mongoose");


// Users order Schema
const orderSchema = mongoose.Schema({
    "username": String,
    "product_list": Array,
    "mode": String,
    "date": {
        type: Date,
        default: Date.now
    }
});



// Users order Model
const OrderModel = mongoose.model("order", orderSchema);


// Exporting Model
module.exports = { OrderModel };