// Importing Modules
const mongoose = require("mongoose"); // importing Mongoose module
require('dotenv').config(); // importing dotenv module for environment variable management

// Creating Connection from MongoDB
const Connection = mongoose.connect(process.env.mongoDB_URL); // creating connection with MongoDB using Mongoose and MongoDB URL provided in environment variable

// Exporting Custom Module
module.exports = { Connection }; // exporting Connection object for other modules to use
