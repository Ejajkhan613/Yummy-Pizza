// Importing Modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require('dotenv').config();




// Importin Custom Modules
const { connection } = require("./configs/db");
const { adminRoute } = require("./routes/admin");
const { addressRoute } = require("./routes/address");
const { productRoute } = require("./routes/products");
const { userRoute } = require("./routes/users");
const { cartRoute } = require("./routes/cart");
const { discountRoute } = require("./routes/discounts");
const { orderRoute } = require("./routes/orderHistory");


// port number
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
app.use("/admin", adminRoute)

// Users Data Segregation

// Address Route
app.use("/address", addressRoute);


// Cart Route
app.use("/cart", cartRoute)

// Products Route
app.use("/products", productRoute)

// Discount Route
app.use("/discount", discountRoute)

// OrderHistory
app.use("/orderHistory", orderRoute)


// Starting server and connecting to the MongoDB
app.listen(port, async (req, res) => {
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error while connecting to Database");
    }
    console.log(`Listening to the port ${port}`);
});