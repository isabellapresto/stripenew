const express = require("express");
const cors = require("cors");
const bodyParser = require ("body-parser")
const { customerRouter } = require ("./routes/customerRouter");
const { productRouter } = require ("./routes/productRouter");
const { checkoutRouter } = require ("./routes/checkoutRouter");
const cookieSession = require ("cookie-session");
const crypto = require ("crypto"); 

const app = express();

// Middlewares
app.use(cors({ 
  origin: "*" 
}));

// crypto key
const secretKey = process.env.COOKIE_SECRET_KEY;

// //Cookies
app.use(cookieSession({
  name: 'session',
  keys: [secretKey],
  maxAge: 24 * 60 * 60 * 1000 
  // sameSite: "strict",
  // httpOnly: true,
  // secure: false,
}))

app.use(express.json());
app.use(bodyParser.json());

//Routes
app.use("/api", customerRouter);
app.use("/api", productRouter);
app.use("/api", checkoutRouter);

module.exports = { app }