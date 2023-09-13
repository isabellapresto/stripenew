const { initStripe } = require ("../stripe");
const stripe = initStripe ();

async function getProducts(req, res) {
  try {
    const products = await stripe.products.list({
     limit: 5, 
     expand:[ data.default_price],
    });
    res.status(200).json(products);
   } catch (error) {
    res.status(500).json ({error: error.message})
   }
  }
    
  console.log(getProducts);

module.exports = {
  getProducts,
};
