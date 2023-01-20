// Importing Modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);



// Importin Custom Modules
const { connection } = require("./configs/db");
const { adminRoute } = require("./routes/admin");
const { addressRoute } = require("./routes/address");
const { productRoute } = require("./routes/products");
const { userRoute } = require("./routes/users");
const { cartRoute } = require("./routes/cart");


// port number
const port = 4500;

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