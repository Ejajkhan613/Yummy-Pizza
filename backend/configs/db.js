const mongoose = require("mongoose");
require('dotenv').config();

const Connection = mongoose.connect(process.env.DB_URI);

module.exports = { Connection };
