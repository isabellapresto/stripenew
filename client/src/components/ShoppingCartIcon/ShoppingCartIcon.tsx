import React, { useState } from 'react'
import Button from "@mui/material/Button";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Drawer from "../Drawer/Drawer"

function ShoppingCartIcon() {
 const [open, setOpen] = useState(false);

    const handleOpen = () => {

        setOpen(true);

      };

      const handleClose = () => {

        setOpen(false);

      };

 
  return (
<Button variant="outlined" size="small" sx={{width:"150px"}} onClick={open ? handleClose : handleOpen} >

ShoppingCart

<ShoppingCart className="shopping-cart-icon" />

<Drawer open={open} setOpen={setOpen} />

</Button>
  )
}

export default ShoppingCartIcon