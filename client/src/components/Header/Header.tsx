import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';


function Header() {
  return (
    <div className="header-container">
      <div className="left">
        <h1>Logo</h1>
      </div>
      <div className="right">
        <Link to="/register">Register</Link>
        <Link to="/login">Log in to Shop</Link>
       <ShoppingCartIcon></ShoppingCartIcon>
      </div>
    </div>
  );
}

export default Header;
