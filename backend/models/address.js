// Importing required modules
const mongoose = require("mongoose");

// Defining the schema for user addresses
const addressSchema = mongoose.Schema({
    "username": String, // The username associated with the address
    "first_name": String, // First name of the person associated with the address
    "last_name": String, // Last name of the person associated with the address
    "house_no": String, // House number of the address
    "street_no": String, // Street number of the address
    "pincode": String, // Pincode or postal code of the address
    "locality": String // Locality or city of the address
});

// Creating a model for user addresses based on the address schema
const AddressModel = mongoose.model("address", addressSchema);

// Exporting the AddressModel for use in other files
module.exports = { AddressModel };
