import React, { useState } from 'react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = async () => {
    try {
      // Skapa ett JSON-objekt med användarinformation
      const user = {
        username: formData.username,
        password: formData.password,
      };

      // Skicka användarinformation till Stripe och JSON-fil på servern
      const stripeResponse = await window.fetch('/api/stripe/register', { // Lägg till 'window.' här
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username }),
      });

      const serverResponse = await window.fetch('/api/register', { // Lägg till 'window.' här
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      // Visa en bekräftelse för användaren
      if (stripeResponse.ok && serverResponse.ok) {
        console.log('Registrering lyckades');
      } else {
        console.error('Registrering misslyckades');
      }
    } catch (error) {
      console.error('Registrering misslyckades', error);
    }
  };

  return (
    <div>
      <h2>Registrering</h2>
      <form>
        <div>
          <label>Användarnamn:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Lösenord:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleRegistration}>
          Registrera
        </button>
      </form>
    </div>
  );
};

export default Register;
