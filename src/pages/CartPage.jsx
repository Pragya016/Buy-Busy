import React, { useEffect, useState } from 'react'
import Cart from '../components/Cart';
import EmptyCart from '../components/EmptyCart';
import PlaceOrderCard from '../components/PlaceOrderCard';
import { useCartContext } from '../context/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../context/auth.context';
import { getProducts } from '../store/firebase.services';
import axios from 'axios';

export default function CartPage() {
    const products = useSelector(state => state.cart);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useAuthContext();
  const { setCart, cart } = useCartContext();

  useEffect(() => {
    if (currentUser) {
      dispatch(getProducts(currentUser.uid));
      axios.get(process.env.REACT_APP_API_URL)
        .then(res => setData(res.data))
        .catch(err => console.error('Error fetching data:', err));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (products.length && data.length) {
      // iterating over data array
      const items = data.reduce((acc, item) => {
      const product = products.find(p => p.productId === item.id.toString());
        if (product) acc.push({ ...item, quantity: product.quantity });
        return acc;
      }, []);
      setCart(items)
    }
  }, [products, data]);

    const cartContainerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height:'100%'
    }

    const containerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        margin: 'auto',
        height:'90vh'
    }
    
  return (
    <div style={containerStyles}>
      {
        cart.length <= 0 ? <EmptyCart/> :
        <div style={cartContainerStyles}>
        <Cart cartItems={cart} />
        <PlaceOrderCard />
      </div>}
    </div>
  )
}
