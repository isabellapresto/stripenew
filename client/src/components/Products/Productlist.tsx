
import './Productlist.css'; 
import { useProductContext } from "../../../Context/productContext"

function ProductList(){
  const { products, addToCart } = useProductContext();

  return (
    <div className="product-list">
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <div className="product-image">
       <img
          src={product.image}
          alt={product.name}
        />

            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price.unit_amount} {product.price.currency}</p>
              <button className='addToCart' onClick = {() => addToCart(product.price.id, product.name, product.image, product.price.unit_amount, product.price.currency)}>Add to cart</button>
            </div>
            <div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
