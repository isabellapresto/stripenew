import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <h1>Logo</h1>
      <Link to="/register">Register | Log in to Shop</Link>
    </div>
  )
}

export default Header