const express = require('express');
const { registerCustomer } = require ("../controllers/customerController");
const customerRouter = express.Router()

.post("/customers/register", registerCustomer);

//LOGIN

module.exports = { customerRouter };