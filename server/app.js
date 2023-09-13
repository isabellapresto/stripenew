const express = require("express");
const cors = require("cors");
const bodyParser = require ("body-parser")
const { customerRouter } = require ("./routes/customerRouter");
const { productRouter } = require ("./routes/productRouter");
const { checkoutRouter } = require ("./routes/checkoutRouter");
// const cookieSession = require ("cookie-session");
// const crypto = require ("crypto"); //installera ?

const app = express();

// Middlewares
app.use(cors({ 
  origin: "*" 
}));

// crypto key
// const secretKey = process.env.COOKIE_SECRET_KEY;

//Cookies
// app.use(cookieSession({
//   name: 'session',
//   keys: [/* secret keys */],
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))


app.use(express.json());
app.use(bodyParser.json());

//Routes
app.use("/api", customerRouter);
app.use("/api", productRouter);
// app.use("/api", checkoutRouter);

module.exports = { app }