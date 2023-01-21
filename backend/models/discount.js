// Importing Modules
const mongoose = require("mongoose");


// Discount Schema
const discountSchema = mongoose.Schema({
    "name": String,
    "price": Number,
    "date": {
        type: Date,
        default: Date.now
    }
});



// Discount Model
const DiscountModel = mongoose.model("discount", discountSchema);


// Exporting Model
module.exports = { DiscountModel };