const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
require("dotenv").config();
const cors = require("cors");
const path = require('path');

const app = express();

app.use('/images', express.static(path.join(__dirname, '../public/images')));
// Connect to MongoDB
connectDB();

const Product = require("./models/product.js");
const { MOCK_DATA } = require("./mockData"); // Correct import syntax

const addProducts = async () => {
  const products = MOCK_DATA;

  try {
    await Product.insertMany(products);
    console.log("Products added!");
  } catch (error) {
    console.log("Error adding products:", error);
  }
};

addProducts();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data

// Routes
app.use("/api/products", productRoutes);

// Error handling middleware
app.use(errorHandler);

// Port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
