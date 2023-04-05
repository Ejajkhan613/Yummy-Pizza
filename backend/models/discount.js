// Importing required modules
const mongoose = require("mongoose");

// Defining the schema for the discount
const discountSchema = mongoose.Schema({
    "name": String, // The name of the discount
    "price": Number, // The discounted price
    "date": {
        type: Date,
        default: Date.now // The date the discount was applied, defaults to the current date
    }
});

// Creating a model for the discount based on the discount schema
const DiscountModel = mongoose.model("discount", discountSchema);

// Exporting the DiscountModel for use in other files
module.exports = { DiscountModel };
