// Importing Modules
const mongoose = require("mongoose");


// Users Address Schema
const addressSchema = mongoose.Schema({
    "username": String,
    "first_name": String,
    "last_name": String,
    "house_no": String,
    "street_no": String,
    "pincode": String,
    "locality": String
});



// Users Address Model
const AddressModel = mongoose.model("address", addressSchema);


// Exporting Model
module.exports = { AddressModel };