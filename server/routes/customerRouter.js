const express = require('express');
const {
  registerCustomer,
  logIn,
  logOut,
  authorize, 
} = require("../controllers/customerController");
const customerRouter = express.Router();

customerRouter
  .post("/customers/register", registerCustomer)
  .post("/customers/login", logIn)
  .post("/customers/logout", logOut) 
  .get("/protected-route", authorize, (req, res) => {
    res.json({ message: "This is a protected route" });
  });

module.exports = { customerRouter };

