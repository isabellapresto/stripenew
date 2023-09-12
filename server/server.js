require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const fs = require("fs");
const app = express();
app.use(express.json());

const CLIENT_URL = "http://127.0.0.1:5173";

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// Användarregistrering
app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Läs användaruppgifter från JSON-filen 
    const users = fs.existsSync("db/users.json")
      ? JSON.parse(fs.readFileSync("db/users.json", "utf-8"))
      : [];

    // Skapa en ny användare
    const newUser = { username, password };

    // Lägg till den nya användaren i arrayen
    users.push(newUser);

    // Spara användaruppgifterna i JSON-filen
    fs.writeFileSync("db/users.json", JSON.stringify(users, null, 2));

    // Skicka användaruppgifterna till Stripe för registrering
    // Använd din Stripe-kod här för att registrera användaren i Stripe
    // T.ex., använd stripe.customers.create() för att skapa en kund i Stripe

    res.status(200).json({ message: "Användaren registrerad och uppgifter sparade" });
  } catch (error) {
    console.error("Registrering misslyckades:", error);
    res.status(500).json({ error: "Något gick fel vid registreringen" });
  }
});

// Skapa en checkout-session med Stripe
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

app.listen(3000, () => console.log("Server is up and running.."));
