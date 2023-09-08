// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// async function getProducts(req, res) {
//   try {
//     const products = await stripe.products.list();
//     res.json(products.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Något gick fel' });
//   }
//   console.log(products);
// }

// module.exports = {
//   getProducts,
// };
