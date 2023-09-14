const express = require('express');
const { registerCustomer  } = require ("../controllers/customerController");
// , getAllCustomers, logIn,
const customerRouter = express.Router()

.post("/customers/register", registerCustomer);
// .post("/customers/login", login);
// .post("/customers/register", registerCustomer);


//LOGIN

module.exports = { customerRouter };