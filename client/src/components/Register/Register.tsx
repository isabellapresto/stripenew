import React, { useState } from "react";
import "./Register.css"
import Login from "../Login";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Skicka användardata till din stripe med fetch
      const response = await fetch("/api/customers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log("Kund registrerad framgångsrikt.");
    
      } else {
        console.error("Fel vid registrering av kund:", response.statusText);
    
      }
    } catch (error) {
      console.error("Fel vid registrering av kund:", error);
   
    }
  };

  return (
    <div className="container">
      <h2>Registrera en ny kund</h2>
      <form  onSubmit={handleSubmit}>
        <div>
          <label>Användarnamn:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>E-post:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lösenord:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Registrera</button>
        </div>
      </form>
      <Login></Login>
    </div>
  );
}

export default Register;
