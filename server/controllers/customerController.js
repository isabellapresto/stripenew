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



//LOGIN
async function logIn(req, res) {
  const { username, password } = req.body;

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const customersArray = JSON.parse(fileData);

    // Find the customer by username
    const customer = customersArray.find((customer) => customer.username === username);

    if (!customer) {
      // Customer not found
      return res.status(400).json({ message: "Customer not found" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (passwordMatch) {
   
    // Set session COOKIES - hur ska man sätta cookies?
    req.session.customer = customer;
    console.log('User logged in cookies:', customer); 

      res.json({ message: "Customer logged in successfully", user: customer });
    } else {
      // Passwords do not match
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// LOGOUT
async function logOut(req, res) {
  try {
    // Här kan du utföra eventuella log-out-åtgärder, t.ex. rensa sessionen
    // och sätt användaren till null eller någon annan representation av "utloggad".

    res.json({ message: "Customer logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// AUTHORIZE
async function authorize(req, res, next) {
  const { user } = req; // Antag att du har en användare lagrad i req-objektet efter inloggning

  if (user) {
    // Användaren är inloggad, gå vidare till nästa middleware eller rutt
    next();
  } else {
    // Användaren är inte inloggad, skicka en förbjuden (403) status
    res.status(403).json({ message: "Unauthorized" });
  }
}

module.exports = {
  registerCustomer,
  getAllCustomers,
  logIn,
  logOut,
  authorize, // Lägg till authorize här
};

