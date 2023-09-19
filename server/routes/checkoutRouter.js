const express = require('express');
const { checkOut } = require ("../controllers/checkoutController");
const checkoutRouter = express.Router()

.post("/create-checkout-session", checkOut) 

module.exports = { checkoutRouter };