import React, { useState } from 'react'
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Drawer from "../Drawer/Drawer"
import "./ShoppingCartIcon.css"

function ShoppingCartIcon() {
 const [open, setOpen] = useState(false);
 const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
setOpen(false);
};


return (
<button className='cart' onClick={open ? handleClose : handleOpen} >
<ShoppingCart className="shopping-cart-icon" />
<Drawer open={open} setOpen={setOpen} />
</button>
  )
}

export default ShoppingCartIcon