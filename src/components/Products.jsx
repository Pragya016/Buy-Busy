import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductsSkeleton from './ProductsSkeleton';
import styles from './css/products.module.css';
import { SearchContext } from '../App';

export default function Products() {
    const [products, setProducts] = useState([]);
    const { searchVal } = useContext(SearchContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getProducts() {
            const res = await axios.get(process.env.REACT_APP_API_URL);

            if (res.status === 200) {
                setProducts(res.data);
                setIsLoading(false);
            }
        }
        
        // fetch the data and store in the products state
        getProducts()
    }, [])

  return (
    <div id={styles.container}>
        {isLoading && <ProductsSkeleton/>}
        {products.map(product => (
            <ProductCard product={product} key={product.id}/>
        ))}      
    </div>
  )
}
