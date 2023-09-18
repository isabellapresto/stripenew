import React from 'react'
import Drawer from "@mui/material/Drawer";
import { useProductContext } from '../../../Context/productContext';

interface ShoppingDrawerProps {
 open: boolean;
 setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyDrawer({open, setOpen}: ShoppingDrawerProps) {
  const {cart, handlePayment} = useProductContext();
 const toggleDrawer = () => (event: { type: string; key: string; }) => {

  if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {

    return;

  }
  setOpen(false);

};



// const handleButtonClick = () => {

//   setOpen(false);

// };

// export function addToCart() {
// console.log("log från addToCart")
// }


return (
  <Drawer anchor="right" open={open} onClose={toggleDrawer()}>
    <div>My Drawer</div>
    <ul>
      {cart.map((cartItem, index) => (
        <li key={index}>
          <div className="product-image">
            <img src={cartItem.image} alt={cartItem.name} />
          </div>
    
          <div>
            <p>{cartItem.name}</p>
            <p>Price: {cartItem.price}</p>
            <p>Quantity: {cartItem.quantity}</p>
          </div>
        </li>
      ))}
    </ul>
    //
    <button onClick={handlePayment}>Go to Checkout</button>
  </Drawer>
);

}
export default MyDrawer
