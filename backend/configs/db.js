// Importing Modules
const mongoose = require("mongoose");


// Creating Connection from MongoDB
const Connection = mongoose.connect("mongodb+srv://ejajulansari:ejajulansari@ejajulansari.pqblhhv.mongodb.net/nxm101?retryWrites=true&w=majority");




// Exporting Custom Module
module.exports = { Connection };
