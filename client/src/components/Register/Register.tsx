import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import './Register.css';

const Register = () => {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  // Success message state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/customers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Customer registered successfully:', data);
        setSuccessMessage('You have been registered successfully');
      } else {
        const errorData = await response.json();
        console.error('Registration error:', errorData);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleOpen}>Register</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-content">
          <h2>Registration</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="submit">Register</button>
              {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
          </form>
          <div>
            {/* <Link to="/login">Log in to Shop</Link> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
