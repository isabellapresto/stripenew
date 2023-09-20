import React from 'react';
import './Header.css';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';
import Login from '../Login/Login';
import Register from '../Register/Register';

function Header() {
  return (
    <div className="header-container">
      <h1 className="logo">Logo</h1>
      <div className="button-container">
        <Register />
        <Login />
        <ShoppingCartIcon />
      </div>
    </div>
  );
}

export default Header;

