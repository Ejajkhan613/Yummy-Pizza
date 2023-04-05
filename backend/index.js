// Importing required modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require('dotenv').config();

// Importing Custom Modules
const { connection } = require("./configs/db"); // Connection to MongoDB
const { adminRoute } = require("./routes/admin"); // Admin Route
const { addressRoute } = require("./routes/address"); // Address Route
const { productRoute } = require("./routes/products"); // Products Route
const { userRoute } = require("./routes/users"); // Users Route
const { cartRoute } = require("./routes/cart"); // Cart Route
const { discountRoute } = require("./routes/discounts"); // Discount Route
const { orderRoute } = require("./routes/orderHistory"); // Order History Route


// Port number
const port = process.env.port_no;

// Using express as app keyword
const app = express();

// Using Cors
app.use(cors());


// Routes

// GET request for Homepage
app.get("/", (req, res) => {
    res.send("Welcome to Yummy Pizza Store by Ejajul Ansari");
});

// Users Route Segregation
app.use("/users", userRoute);

// Admin Route
app.use("/admin", adminRoute);

// Users Data Segregation

// Address Route
app.use("/address", addressRoute);

// Cart Route
app.use("/cart", cartRoute);

// Products Route
app.use("/products", productRoute);

// Discount Route
app.use("/discount", discountRoute);

// OrderHistory
app.use("/orderHistory", orderRoute);


// Starting server and connecting to the MongoDB
app.listen(port, async (req, res) => {
    try {
        await connection; // Waits for MongoDB connection
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error while connecting to Database");
    }
    console.log(`Listening to the port ${port}`);
});
