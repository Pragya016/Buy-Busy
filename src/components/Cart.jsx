import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/firebase.services';
import { useAuthContext } from '../context/auth.context';
import axios from 'axios';
import CartItem from './CartItem';
import styles from './css/cart.module.css'
import { useCartContext } from '../context/cart.context';
import {CircularProgress } from '@mui/material';

export default function Cart({cartItems}) {
  return (
    <div id={styles.container}>
      {cartItems.length <= 0 ? <div id={styles.loaderContainer}><CircularProgress /></div> : 
            <div id={styles.cartContainer}>
            {cartItems.length > 0 && cartItems.map(item => (
              <CartItem key={item.id} product={item} />
            ))}
          </div>
      }
      </div>
  );
}
