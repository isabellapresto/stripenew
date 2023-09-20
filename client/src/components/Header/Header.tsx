import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';
import Login from '../Login/Login';

function Header() {
  return (
    <div className="header-container">
      <div className="left">
        <h1>Logo</h1>
      </div>
      <div className="right">
        <Link to="/register">Register</Link>
        <Login></Login>
       <ShoppingCartIcon></ShoppingCartIcon>
      </div>
    </div>
  );
}

export default Header;
