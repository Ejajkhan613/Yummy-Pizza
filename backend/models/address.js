const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    "username": String,
    "first_name": String,
    "last_name": String,
    "house_no": String,
    "street_no": String,
    "pincode": String,
    "locality": String
});

const AddressModel = mongoose.model("address", addressSchema);

module.exports = { AddressModel };
