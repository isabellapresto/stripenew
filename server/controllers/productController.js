const { initStripe } = require('../stripe');
const stripe = initStripe();

const fs = require('fs');
const path = require('path');

const filePath = path.join('db', 'products.json');

async function getProducts(req, res) {
  try {
    const products = await stripe.products.list({
      limit: 5,
      expand: ['data.default_price'],
    });

    // lägg till i json
    fs.writeFileSync(filePath, JSON.stringify(products.data, null, 2));

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}

module.exports = {
  getProducts,
};
