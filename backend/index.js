const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require('dotenv').config();

const { connection } = require("./configs/db");
const { adminRoute } = require("./routes/admin");
const { addressRoute } = require("./routes/address");
const { productRoute } = require("./routes/products");
const { userRoute } = require("./routes/users");
const { cartRoute } = require("./routes/cart");
const { discountRoute } = require("./routes/discounts");
const { orderRoute } = require("./routes/orderHistory");


const port = process.env.PORT;

const app = express();

app.use(cors());


// Routes

// GET request for Homepage
app.get("/", (req, res) => {
    res.send("Welcome to Yummy Pizza Store by Ejajul Ansari");
});

// GET request for Ping 1 (Render)
app.get("/ping1", (req, res) => {
    res.send("Ping 1");
});

// GET request for Ping 2 (Render)
app.get("/ping2", (req, res) => {
    res.send("Ping 2");
});

// Users Route
app.use("/users", userRoute);

// Admin Route
app.use("/admin", adminRoute);

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


const https = require('https');

setInterval(() => {
    https.get('https://pizzabackend-rdbu.onrender.com/ping1', (res) => {
        console.log(`Self-ping 1 status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error('Error with self-ping: ', err.message);
    });
}, 1000 * 90);

setInterval(() => {
    https.get('https://pizzabackend-rdbu.onrender.com/ping2', (res) => {
        console.log(`Self-ping 2 status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error('Error with self-ping: ', err.message);
    });
}, 1000 * 120);


app.listen(port, async (req, res) => {
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error while connecting to Database");
    }
    console.log(`Listening to the port ${port}`);
});
