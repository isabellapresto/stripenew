import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Något gick fel vid hämtning av produkter.');
        }
      } catch (error) {
        console.error('Något gick fel vid hämtning av produkter.', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Produkter</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
