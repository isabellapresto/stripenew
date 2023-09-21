// // Create checkout-session with Stripe
const { initStripe } = require ("../stripe");
const stripe = initStripe();

const CLIENT_URL = "http://localhost:5173";

const checkOut = async (req,res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      customer: req.session.id,
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Det gick inte bra...");
  }
};

module.exports = {
 checkOut
};

