const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
    "name": String,
    "price": Number,
    "date": {
        type: Date,
        default: Date.now
    }
});

const DiscountModel = mongoose.model("discount", discountSchema);

module.exports = { DiscountModel };
