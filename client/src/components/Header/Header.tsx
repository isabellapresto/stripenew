import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header-container">
      <div className="left">
        <h1>Logo</h1>
      </div>
      <div className="right">
        <Link to="/register">Register</Link>
        <Link to="/login">Log in to Shop</Link>
       
        <p>Cart</p>
      </div>
    </div>
  );
}

export default Header;
