const express = require('express');
const { getProducts } = require ("../controllers/productController");
const productRouter = express.Router()

// Get products from Stripe
.get("/products", getProducts);

module.exports = { productRouter };