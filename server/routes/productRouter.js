const express = require('express');
const { getProducts } = require ("../controllers/productController");
const productRouter = express.Router()

// Hämta produkter från Stripe
.get("/products", getProducts);

module.exports = { productRouter };