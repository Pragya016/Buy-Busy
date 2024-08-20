import React from 'react'
import styles from './css/place.order.card.module.css';
import { useCartContext } from '../context/cart.context';
import OrderDialog from './OrderDialog';

export default function PlaceOrderCard() {
    const { cart } = useCartContext()
    const totalAmount = cart.reduce((acc,item) => {
        const price = convertDollarToRupee(item.price);
        return acc += price;
    }, 0)

    const totalItems = cart.reduce((acc, item) => {
        return acc += item.quantity;
    }, 0)

    const totalDiscount = Math.ceil(totalAmount * 0.20);
    const finalAmount = getDiscountedPrice(totalAmount);

    function convertDollarToRupee(dollars, conversionRate = 80) {
        const rupees = dollars * conversionRate;
        return Math.ceil(rupees);
    }

    function getDiscountedPrice(totalAmount) {
        // Calculate 10% discount
        const discount = totalAmount * 0.20;
        const discountedPrice = totalAmount - discount;
        return Math.ceil(discountedPrice);
    }

  return (
      <div id={styles.container}>
          <h4 id={styles.heading}>price details</h4>
          <hr className={styles.hr} />
          <div className={styles.box}>
              <p className={styles.text}>Price {`(${totalItems} items)`}</p>
              <p className={styles.text}>&#8377;{totalAmount}</p>
           </div>
          <div className={styles.box}>
              <p className={styles.text}>Discount</p>
              <p className={`${styles.text} ${styles.price}`}>&#8377;{totalDiscount}</p>
           </div>
          <div className={styles.box}>
              <p className={styles.text}>Platform Fee</p>
              <p className={styles.text}>&#8377;{2}</p>
           </div>
          <div className={styles.box}>
              <p className={styles.text}>Delivery Charges</p>
              <div className={styles.text}>
                <span id={styles.deliveryPrice}>&#8377;40</span><span className={styles.price}>Free Delivery</span>
              </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.box}>
            <h4 id={styles.totalAmountText}>Total Amount</h4>
              <p id={styles.totalAmount}>&#8377;{ finalAmount }</p>
          </div>
          <hr className={styles.hr} />
          <p className={styles.text} style={{ color: 'green' }}>You will save &#8377;{totalDiscount} on this order.</p>
          <OrderDialog btnId={styles.btn} totalAmount={finalAmount} discount={totalDiscount}/>
          {/* <Button variant='contained' color='warning' id={styles.btn} onClick={() => navigate('/')}>Place Order</Button> */}
      </div>
  )
}
