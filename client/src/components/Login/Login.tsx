import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { useCustomerContext, RegisteredCustomer } from "../../../Context/customerContext";

export default function Login() {
  const { login } = useCustomerContext();

  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form state
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Function to handle form 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Customer data for login
    const customer: RegisteredCustomer = {
      username: formValues.username,
      password: formValues.password,
    };

    // Call the login function
    await login(customer);

    // Clear the form
    setFormValues({
      username: '',
      password: '',
    });

    // Close the modal
    handleClose();
  };

  return (
    <div>
      <button onClick={handleOpen}>Login</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit">Log in into account</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
