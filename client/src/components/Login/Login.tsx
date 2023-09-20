import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { useCustomerContext, RegisteredCustomer } from "../../../Context/customerContext";

export default function Login() {
  const { login, loggedInCustomer } = useCustomerContext();

  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form state
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  // Success message state
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Function to handle form submission
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

    // Check if the user is logged in and set the success message
    if (loggedInCustomer) {
      setSuccessMessage('Du är inloggad');
    }

    // Keep the modal open
    handleClose(); // Ta bort detta så att modalen inte stängs automatiskt
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
        <div className="modal-content">
          <h2>Log in</h2>
          {successMessage && <p>{successMessage}</p>}
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
              <button type="submit">Log in</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
