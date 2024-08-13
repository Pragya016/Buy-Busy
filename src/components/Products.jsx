import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import styles from './css/products.module.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getProducts() {
            const {data} = await axios.get(process.env.REACT_APP_API_URL)
            return data;
        }
        
        // fetch the data and store in the products state
        getProducts().then(data => setProducts(data)).finally(() => setIsLoading(false));
    }, [])

  return (
    <div id={styles.container}>
        {isLoading && <ProductSkeleton/>}
        {products.map(product => (
            <ProductCard product={product} key={product.id}/>
        ))}      
    </div>
  )
}
