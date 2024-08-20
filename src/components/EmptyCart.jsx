import React from 'react'
import { Button } from '@mui/material'
import styles from './css/empty.cart.module.css'
import { useNavigate } from 'react-router-dom'

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div id={styles.emptyContainer}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmtxhj4EguvxjSd6xJAEVhpJIk3mRWRv0w3g&s" alt="cart-img" id={styles.image} />
        <h1 id={styles.empty_cart_heading}>Your cart is empty</h1>
        <p id={styles.text}>Looks like you haven't added anything to your cart. Go ahead & explore top categories.</p>
        <Button onClick={() => navigate('/')} id={styles.btn} variant='contained'>Start Shopping</Button>
    </div>
  )
}
