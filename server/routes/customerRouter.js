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
  .post("/customers/logout", logOut) // Skapa en logout-rutt
  .get("/protected-route", authorize, (req, res) => {
    // Detta är en skyddad rutt, bara tillgänglig för inloggade användare
    res.json({ message: "This is a protected route" });
  });

module.exports = { customerRouter };

