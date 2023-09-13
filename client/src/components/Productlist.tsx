import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  default_price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
 
    fetch('/api/products')  //fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error('Något gick fel:', error));
  }, []);

  return (
    <div>
      <h1>Produkter</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <p>Pris: {product.default_price}</p>
            <p>Beskrivning: {product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

