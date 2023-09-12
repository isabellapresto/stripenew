

import { Router } from 'express';
import stripe from 'stripe'; 

const stripeRouter = Router();
const stripeSecretKey = 'YOUR_STRIPE_SECRET_KEY'; // Lägg till din Stripe hemlighet här


const stripeClient = new stripe(stripeSecretKey);

// POST endpoint för att registrera användaren i Stripe
stripeRouter.post('/register', async (req, res) => {
  try {
    const { username } = req.body;

    // Skapa en kund i Stripe (detta är en förenklad version)
    const customer = await stripeClient.customers.create({
      email: username,
    });

    // Här kan du spara Stripe-kundens ID i din användardatabas om det behövs

    res.status(200).json({ message: 'Användaren registrerad i Stripe' });
  } catch (error) {
    console.error('Stripe-registrering misslyckades:', error);
    res.status(500).json({ error: 'Något gick fel vid registreringen i Stripe' });
  }
});

export default stripeRouter;
