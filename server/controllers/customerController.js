const { initStripe } = require ("../stripe");
const stripe = initStripe();
const bcrypt = require ("bcrypt");
const fs = require ("fs");
const path = require ("path");
const filePath = path.join("db", "customers.json");

//REGISTER
async function registerCustomer(req, res) {
  try {
    const { username, password, email } = req.body;

    // Läs in befintna kunder från JSON-filen
    let customersArray = [];

    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      customersArray = JSON.parse(fileData);
    } catch (err) {
      console.log(err);
    }

    // Kolla om kunden redan finns
    const existingCustomer = customersArray.find(
      (customer) => customer.username === username || customer.email === email
    );

    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

   // Registrera användaren i Stripe 
   const customer = await stripe.customers.create({
    name: username,
    email: email,
  });

    // Skapa en ny kund
    const newCustomer = {
      id: customer.id,
      username,
      password: hashedPassword,
      email: customer.email
    };

    // Lägg till den nya kunden i arrayen
    customersArray.push(newCustomer);

    // Skriv uppdaterad lista av kunder till JSON-filen
    fs.writeFileSync(filePath, JSON.stringify(customersArray, null, 2));

    res.json({ message: "Customer registered successfully", user: newCustomer, customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//getAllCustomers
async function getAllCustomers(req, res) {
  try {
    const customers = await stripe.customers.list({
      limit: 100,
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// //LOGIN
// async function logIn (req, res) {
//   const { username, password } = req.body;

//   try{
//     const fileData = fs.readFileSync(filePath, "utf8");
//     const customersArray = JSON.parse(fileData);

//     const customer = customersArray.find((customer) => customer.username === username)
//   }
// }


module.exports = {
 registerCustomer, getAllCustomers
};
