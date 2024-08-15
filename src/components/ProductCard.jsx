import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/product.card.module.css'
import { Button } from '@mui/material';

export default function ProductCard({ product }) {

  const navigate = useNavigate();
  const price = convertDollarToRupee(product.price);

    function handleDisplayProductDetails() {
        navigate(`/product/${product.id}`);
    }

    function convertDollarToRupee(dollars, conversionRate = 80) {
        const rupees = dollars * conversionRate;
        return Math.ceil(rupees);
    }
  
  return (
    <div onClick={handleDisplayProductDetails} id={styles.box}>
      <div id={styles.topContainer}>
        <img src={product.image} alt={product.title} id={styles.image} />
      </div>
      <div id={styles.bottomContainer}>
        <p className={styles.text} id={styles.title}>{product.title }</p>
        <p className={styles.text} id={styles.price}>&#8377;{price}</p>
        <p className={styles.text} id={styles.note}>Free Delivery</p>
      </div>
      </div>
  )
}
