import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function getProductDetails() {
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`)
      console.log(data);
    }

    getProductDetails();
  }, [])

  return (
    <div>
        product details      
    </div>
  )
}
