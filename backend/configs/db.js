// Importing Modules
const mongoose = require("mongoose");
require('dotenv').config();


// Creating Connection from MongoDB
const Connection = mongoose.connect(process.env.mongoDB_URL);




// Exporting Custom Module
module.exports = { Connection };
