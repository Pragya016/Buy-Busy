import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './css/product.details.module.css';
import { Button, CircularProgress, Rating } from '@mui/material';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/firebase.services';
import { useAuthContext } from '../context/auth.context';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const price = convertDollarToRupee(product.price);
    const dispatch = useDispatch();
    const { isLoggedIn, currentUser } = useAuthContext();
    const navigate = useNavigate();
    const rating = product.rating?.rate === 1 ? 1 : Math.floor(product.rating?.rate);

    useEffect(() => {
        async function getProductDetails() {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);

            if (res.status === 200) {
                setIsLoading(false);
                setProduct(res.data);
            }
        }
        getProductDetails();
    }, [])

    function convertDollarToRupee(dollars, conversionRate = 80) {
        const rupees = dollars * conversionRate;
        return Math.ceil(rupees);
    }

    function handleAddToCart(product) {
        if (isLoggedIn) {
            dispatch(addToCart({ productId : String(product.id), userId : currentUser.uid}));
        } else {
            navigate('/sign-in');
        }
    }
    
    return (
        <>
            {isLoading && <div id={styles.loaderContainer}><CircularProgress/></div>}
            {/* {isLoading && <ProductDetailsSkeleton />} */}
            {!isLoading && <div id={styles.container}>
                <div id={styles.leftSide}>
                    <img src={product.image} alt={product.title} id={styles.image} />
                </div>
                <div id={styles.rightSide}>
                    <h3 id={styles.category}>{product.category}</h3>
                    <h1 id={styles.title}>{product.title}</h1>
                    <div id={styles.ratingContainer}>
                        <div> 
                            <span id={styles.rating}>{product.rating?.rate}</span>
                            <Rating name="read-only" value={rating} readOnly />
                        </div>
                        <p id={styles.review}>{product.rating?.count} reviews</p>
                    </div>
                    <h1 id={styles.price}>&#8377;{price}</h1>
                    <h3 id={styles.descHeading}>About this item</h3>
                    <p id={styles.desc}>{product.description}</p>
                <div id={styles.btnContainer}>
                    {/* <Button variant='contained' id={styles.orderBtn} color='warning' onClick={() => navigate('/cart')} >Order Now</Button> */}
                    {/* <OrderDialog btnId={styles.orderBtn} title='Order Now' totalAmount={price} /> */}
                    <Button variant='contained' id={styles.cartBtn} color='warning' onClick={() => handleAddToCart(product)} >Add To Cart<AddShoppingCartIcon style={{marginLeft:'5px', fontSize:'1.3rem'}}/></Button>
                </div>
                </div>
            </div>}
        </>
    )
}
