import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/product.card.module.css'

export default function ProductCard({ product }) {

    const navigate = useNavigate();

    function handleDisplayProductDetails() {
        navigate(`/product/${product.id}`);
    }

  return (
    <div onClick={handleDisplayProductDetails} id={styles.box}>
      <div id={styles.topContainer}>
        <img src={product.image} alt={product.title} id={styles.image} />
      </div>
      <div id={styles.bottomContainer}>
        <p className={styles.text} id={styles.title}>{product.title }</p>
        <p className={styles.text} id={styles.price}>&#8377;{product.price}</p>
        <p className={styles.text} id={styles.note}>Free Delivery</p>
      </div>
      </div>
  )
}
