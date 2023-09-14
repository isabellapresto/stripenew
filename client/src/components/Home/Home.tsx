import React from 'react'
import ProductList from '../Products/Productlist'; 
import Header from '../Header/Header';


import "./Home.css"


function Home() {
  return (
    <div>
     <Header></Header>
     <ProductList></ProductList>
    </div>
  );
}


export default Home
