// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true }, // Store the image path or URL
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
