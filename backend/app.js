// app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use(express.json()); // To parse JSON data
app.use(morgan("dev"));
app.use(cors());

// app.use('/api', userRoutes);

// Routes
app.use("/api/products", productRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
