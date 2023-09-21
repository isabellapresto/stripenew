import React from 'react'
import ProductList from '../Products/Productlist'; 
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <div>
     <Header></Header>
     <ProductList></ProductList>
     <Footer></Footer>
    </div>
  );
}

export default Home
