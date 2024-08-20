import React from 'react'
import styles from './css/cart.item.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAuthContext } from '../context/auth.context';
import { removeFromCart } from '../store/firebase.services';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CartItem({product}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuthContext();
  const price = convertDollarToRupee(product.price);

  function convertDollarToRupee(dollars, conversionRate = 80) {
        const rupees = dollars * conversionRate;
        return Math.ceil(rupees);
  }

  function handleRemoveFromCart(productId) {
    try {
      const confirmation = window.confirm('Are you sure you want to delete this product from your cart?');

      if (!confirmation) return;
        
      dispatch(removeFromCart({ productId, userId: currentUser.uid }))
      
      // toast.success('item removed from the cart.')
    } catch (error) {
      // toast.error("Couldn't remove item fron the cart");
    }
  }

  return (
    <>
    <div id={styles.container}>
      <div id={styles.leftSide} onClick={() => navigate(`/product/${product.id}`)}>
        <img src={ product.image} alt={product.title} id={styles.image}/>
      </div>
      <div id={styles.rightSide}>
        <p id={styles.title}>{product.title}</p>
        <div id={styles.bottomContainer}>
          <p id={styles.price}>&#8377;{price}</p>
          <p>X{product.quantity}</p>
        </div>
        <Button id={styles.removeBtn} onClick={() => handleRemoveFromCart(product.id)}>Remove</Button>
      </div>
      </div>
      {/* <ToastContainer/> */}
    </>
  )
}
