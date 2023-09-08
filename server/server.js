require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const productController = require('./controllers/productController');

const app = express();
app.use(express.json());

const CLIENT_URL = "http://127.0.0.1:5173";

//Middlewares
app.use(
  cors({
    origin: "*",
  })
);


//produkter
// export default async function handler(req, res) {
//   try {
//     const products = await stripe.products.list({
//       limit: 100,
//     });

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Det gick inte bra...");
  }
});

// Hämta produkter från Stripe
// app.get('/api/products', productController.getProducts);

app.listen(3000, () => console.log("Server is up and running.."));
