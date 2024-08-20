import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../store/firebase.services';
import { useAuthContext } from '../context/auth.context';
import axios from 'axios';
import OrderItem from './OrderItem';
import { Button } from '@mui/material';
import styles from './css/orders.module.css';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
    const orderState = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const { currentUser } = useAuthContext();
    const [data, setData] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            dispatch(getOrders(currentUser.uid));
            axios.get(process.env.REACT_APP_API_URL)
                .then(res => setData(res.data))
                .catch(err => console.error('Error fetching data:', err));
        }
    }, [currentUser, dispatch]);

    useEffect(() => {
        if (orderState.length && data.length) {
            // iterating over data array
            const items = data
                .map(item => {
                    const order = orderState.find(product => Number(product.productId) === item.id);
                    return order ? { ...item, quantity: order.quantity, dateOfOrder : order.dateOfOrder } : null;
                })
                .filter(order => order !== null); 

            setOrders(items);
        }
    }, [orderState, data]);

    return (
        <>
        {orders.length <= 0 && <div id={styles.emptyContainer}>
                <img src="https://i.pinimg.com/564x/ae/bc/8c/aebc8c60e30c83f3ab34c978733dab26.jpg" alt="no-order-img" id={ styles.image} />
                <h1 id={styles.heading}>No order found</h1>
                <p id={styles.text}>Looks like you haven't made your order yet</p>
                <Button id={styles.btn} variant='contained' color='warning' onClick={() => navigate('/')}>Back to Menu</Button>
        </div>}
        <div>
            {orders.map(order => (
                <OrderItem key={order.id} order={order} /> 
            ))}
            </div>
        </>
    );
}
