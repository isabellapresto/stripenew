import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { useCustomerContext, RegisteredCustomer } from "../../../Context/customerContext";

 

export default function Login() {
  const {  login  } = useCustomerContext();

 

  // Code for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 

  // Initialize form values
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

 

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

 

    // Call the login function with username and password
    const customer: RegisteredCustomer = {       username: formValues.username,       password: formValues.password,     };     await login(customer);

 

    // Clear the form
    setFormValues({
      username: '',
      password: '',
    });

 

    // Close the modal
    handleClose();
  };

 

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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

// interface LoginFormState {
//   username: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState<LoginFormState>({
//     username: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/api/customers/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),

//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Login successful:', data);
        
//       } else {
//         const errorData = await response.json();
//         console.error('Login error:', errorData);
      
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
   
//     }
//   };

  

