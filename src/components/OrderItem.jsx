import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './css/order.item.module.css';

export default function OrderItem({ order }) {
    const navigate = useNavigate();
    const price = convertDollarToRupee(order.price);

    function convertDollarToRupee(dollars, conversionRate = 80) {
        const rupees = dollars * conversionRate;
        return Math.ceil(rupees);
    }


  return (
    <div id={styles.container}>
      <div id={styles.leftSide} onClick={() => navigate(`/product/${order.id}`)}>
        <img src={ order.image} alt={order.title} id={styles.image}/>
      </div>
      <div id={styles.rightSide}>
        <p id={styles.title}>{order.title}</p>
        <div id={styles.box}>
          <p id={styles.price}>&#8377;{price}</p>
          <p>X{order.quantity}</p>
        </div>
              <p id={styles.dateHeading}>Purchased on {order.dateOfOrder}</p>
              <p id={styles.text}>Your order has been placed and will be delivered soon.</p>
      </div>
      {/* <ToastContainer/> */}
      </div>
  )
}
