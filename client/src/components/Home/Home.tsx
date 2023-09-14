import React from 'react'
import ProductList from '../Products/Productlist'; 
import { Link } from "react-router-dom";


import "./Home.css"


function Home() {
  return (
    <div className='header'>
      <h1>Logo</h1>
      <Link to="/register">Register | Log in to Shop</Link>
     <ProductList></ProductList>
    </div>
  );
}


export default Home
