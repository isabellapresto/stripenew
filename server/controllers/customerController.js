const { initStripe } = require ("../stripe");
const stripe = initStripe();
const bcrypt = require ("bcrypt");
const fs = require ("fs");
const path = require ("path");
const filePath = path.join("db", "customers.json");

//Register
async function registerCustomer(req, res) {
  try {
    const { username, password, email } = req.body;

    let customersArray = [];

    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      customersArray = JSON.parse(fileData);
    } catch (err) {
      console.log(err);
    }

    // Check if customer alreadt exist
    const existingCustomer = customersArray.find(
      (customer) => customer.username === username || customer.email === email
    );

    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

   // Register customer in Stripe
   const customer = await stripe.customers.create({
    name: username,
    email: email,
  });

    // Create new customer
    const newCustomer = {
      id: customer.id,
      username,
      password: hashedPassword,
      email: customer.email
    };

    // Push new customer to the array
    customersArray.push(newCustomer);

    //JSON
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

//Login
async function logIn(req, res) {
  const { username, password } = req.body;

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const customersArray = JSON.parse(fileData);

    // Find the customer by username
    const customer = customersArray.find((customer) => customer.username === username);

    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (passwordMatch) {
      // delete
      delete customer.password;

    // Set session COOKIES 
    req.session = customer;
    console.log('User logged in cookies:', customer); 
    res.status(200).json({Message: "Successfully logged in", customer: {username: customer.username}});;
    } else {
      // Passwords do not match
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Logout
async function logOut(req, res) {
  try {
    // Deleate customer-session
    req.session = null;
    res.status(200).json("Customer logged out successfully" );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Authorize 
async function authorize(req, res, next) {
  const { customer } = req; 

  if (customer) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
}

module.exports = {
  registerCustomer,
  getAllCustomers,
  logIn,
  logOut,
  authorize, 
};

