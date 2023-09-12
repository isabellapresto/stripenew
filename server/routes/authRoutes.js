import { Router } from 'express';
import fs from 'fs';
import stripe from 'stripe'; 

const authRouter = Router();
const stripeSecretKey = 'STRIPE_SECTERT_KEY'; 

const stripeClient = new stripe(stripeSecretKey);

authRouter.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Läs användaruppgifter från JSON-filen (om den finns)
    const users = fs.existsSync('db/users.json')
      ? JSON.parse(fs.readFileSync('db/users.json', 'utf-8'))
      : [];

    // Skapa en ny användare
    const newUser = { username, password };

    // Lägg till den nya användaren i arrayen
    users.push(newUser);

    // Spara användaruppgifterna i JSON-filen
    fs.writeFileSync('db/users.json', JSON.stringify(users, null, 2));

    // Registrera användaren i Stripe 
    const stripeCustomer = await stripeClient.customers.create({
      email: username,
    });

    res.status(200).json({ message: 'Användaren registrerad och uppgifter sparade i JSON-filen och Stripe' });
  } catch (error) {
    console.error('Registrering misslyckades:', error);
    res.status(500).json({ error: 'Något gick fel vid registreringen' });
  }
});

export default authRouter;

