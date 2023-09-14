import React, { useEffect, useState } from 'react';
import './Productlist.css'; 

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  images: string[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.data || []);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="product-list">
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <div className="product-image">
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={`${product.name} - Image 1`}
                  width="100"
                  height="100"
                />
              )}
            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {/* visas inte */}
              <p>{product.price} {product.currency}</p>
              <button>Add to cart</button>
            </div>
            <div>
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
