import { Button, DialogContent } from '@mui/material'
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import styles from './css/order.dialog.content.module.css'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function OrderDialogContent({ totalAmount = 0, discount = 0 }) {
    const navigate = useNavigate();
    
  useEffect(() => {
    setTimeout(() => {
        navigate('/')
    }, 5000);
    }, [])
    
  return (
    <DialogContent id={styles.contentContainer}>
      <OfflinePinIcon color='primary' id={styles.tick} />
        <h2 id={styles.amount}>&#8377;{totalAmount}</h2>
        <h2 id={styles.thankText}>Thank You</h2>
        <p id={styles.discount}>You saved &#8377;{discount} on this order.</p>
        <p className={styles.text}>Your payment is complete.</p>
        <p className={styles.text}>You can see your all order at <Link id={styles.link} to='/orders'>My Orders</Link> Page.</p>
        <Button id={styles.btn} variant='contained' color='warning'>Continue Shopping</Button>
    </DialogContent>
  )
}
