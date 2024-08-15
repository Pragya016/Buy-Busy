import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../database/firebase.config.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

const productsCollection = collection(db, 'products');
const usersCollection = collection(db, 'users');

// export const addToCart = createAsyncThunk('products/addToCart', async ({ product, userId }, thunkAPI) => {
//     try {
//         // Create a document reference with userId as the ID
//         const productRef = doc(productsCollection, String(product.id));
//         const productsSnap = await getDoc(productRef);

//         let productData;

//         if (productsSnap.exists()) {
//             productData = productsSnap.data();

//             // check if the user already exists in the users array
//             const doesUserExists = productData.users.some(user => user === userId);

//             // if user already exists, reject with value
//             if(doesUserExists) return thunkAPI.rejectWithValue('Product is already added to the cart.')

//             console.log(doesUserExists)
//             productData.users = [...productData.users, userId];
//             await setDoc(productRef, productData);
//         } else {
//             const productObj = { ...product, users: [userId] };

//             // Save the product object with a specific ID
//             await setDoc(productRef, productObj);
//         }

//         return product;

//     } catch (error) {
//         console.error('Failed to add product to cart:', error);
//         return thunkAPI.rejectWithValue(error.message);
//     }
// });

export const addToCart = createAsyncThunk('users/addToCart', async ({ productId, userId }, thunkAPI) => {
    try {
        const userRef = doc(usersCollection, userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // Get existing user data
            const userData = userSnap.data();
            console.log('Existing User Data:', userData);

            // Check if the productId is already in the user's products array
            const doesProductExist = userData.products.some(pid => pid == productId);

            if (doesProductExist) {
                // If product already exists in the user's cart, reject with value
                return thunkAPI.rejectWithValue('Product is already added to the cart.');
            }

            // Add productId to the user's products array and update the document
            const updatedProducts = userData.products ? [...userData.products, productId] : [productId];
            await setDoc(userRef, { ...userData, products: updatedProducts });
            return updatedProducts;
        } else {
            // If the user does not exist, create a new document with the productId
            const newUserObj = { products: [productId] };
            await setDoc(userRef, newUserObj);
            return newUserObj.products;
        }
    } catch (error) {
        console.error('Failed to add product to cart:', error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getProducts = createAsyncThunk('users/getProducts', async (userId, thunkAPI) => {
    try {
        const userRef = doc(usersCollection, userId);
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
            console.log(userSnap.data().products)
            return userSnap.data().products;
        }

        return thunkAPI.rejectWithValue('No items found in the cart')

    } catch (error) {
        console.log('unable to get products');
        return thunkAPI.rejectWithValue(error.message);
    }
})


// ---------------- Custom functions --------------