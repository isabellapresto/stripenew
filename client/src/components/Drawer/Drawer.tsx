import React from 'react'
import Drawer from "@mui/material/Drawer";
import { useProductContext } from '../../../Context/productContext';
import { useCustomerContext } from '../../../Context/customerContext';
import "./Drawer.css"

interface ShoppingDrawerProps {
 open: boolean;
 setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyDrawer({open, setOpen}: ShoppingDrawerProps) {
  const {cart, handlePayment} = useProductContext();
  const { loggedInCustomer } = useCustomerContext(); 
  const toggleDrawer = () => (event: { type: string; key: string; }) => {

  if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
    return;
  }
  setOpen(false);
};

return (
 
  <Drawer anchor="right" open={open} onClose={toggleDrawer()}>
    <h2>Your Shoppingcart</h2>
    <ul className='product-list'>
      {cart.map((cartItem, index) => (
        <li key={index}>
          <div>
            <img className="product-image-drawer"src={cartItem.image} alt={cartItem.name} />
          </div>
    
          <div>
            <p>{cartItem.name}</p>
            <p>Price: {cartItem.price}</p>
            <p>Quantity: {cartItem.quantity}</p>
          </div>
        </li>
      ))}
    </ul>
      {/*knappen visas endast om användaren är inloggad */}
      {loggedInCustomer ? (
        <button onClick={handlePayment}>Go to Checkout</button>
      ) : null}
  </Drawer>

);

}
export default MyDrawer
