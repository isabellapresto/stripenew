const express = require('express');
const { registerCustomer, logIn } = require("../controllers/customerController");
const customerRouter = express.Router();

customerRouter
  .post("/customers/register", registerCustomer)
  .post("/customers/login", logIn); 

module.exports = { customerRouter };
