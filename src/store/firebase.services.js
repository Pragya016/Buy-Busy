import { doc, setDoc, collection, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../database/firebase.config.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

const usersCollection = collection(db, 'users');

export const addToCart = createAsyncThunk('users/addToCart', async ({ productId, userId }, thunkAPI) => {
    try {
        const userRef = doc(usersCollection, userId);
        const userSnap = await getDoc(userRef);

        let updatedProducts;

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const existingProduct = userData.products.find(item => item.productId === productId);

            if (existingProduct) {
                // Product already exists, update its quantity
                updatedProducts = userData.products.map(item =>
                    item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Product does not exist, add it to the products array
                updatedProducts = [...userData.products, { productId, quantity: 1 }];
            }
            
            // Update the user's document with the updated products array
            await setDoc(userRef, { ...userData, products: updatedProducts });
        } else {
            // If the user does not exist, create a new document with the productId and initial quantity of 1
            updatedProducts = [{ productId, quantity: 1 }];
            await setDoc(userRef, { products: updatedProducts });
        }

        return updatedProducts;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const getProducts = createAsyncThunk('users/getProducts', async (userId, thunkAPI) => {
    try {
        const userRef = doc(usersCollection, userId);
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
            return userSnap.data().products;
        }

        return thunkAPI.rejectWithValue('No items found in the cart')

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const removeFromCart = createAsyncThunk('users/removeFromCart', async ({productId, userId}, thunkAPI) => {
    try {
        const userRef = doc(usersCollection, userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            const data = userSnapshot.data();
                
            const updatedProducts = data.products
                .map(product => {
                    if (Number(product.productId) === productId) {
                        if (product.quantity > 1) {
                            return { ...product, quantity: product.quantity - 1 };
                        } else {
                            return null;
                        }
                    }
                    return product;
                })
                .filter(product => product !== null);
            
            await updateDoc(userRef, {...data, products : updatedProducts});
            return updatedProducts;
        } else {
            return thunkAPI.rejectWithValue("Couldn't remove item from the cart");
        }

    } catch (error) {
        console.log(error)
    }
})

export const placeOrder = createAsyncThunk('users/placeOrder', async ({ userId, date }, thunkAPI) => {
    try {
        const userRef = doc(usersCollection, userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const user = userSnap.data();
            const orders = user.products.map(product => ({...product, dateOfOrder : date}));

            const updatedDoc = { ...user, products: [], orders: user.orders ? [...user.orders, ...orders] : orders }
            await updateDoc(userRef, updatedDoc);
            return orders;
       }
   } catch (error) {
       console.log(error)
   }
})

export const getOrders = createAsyncThunk('users/getOrders', async(userId, thunkAPI) => {
   try {
       const userRef = doc(usersCollection, userId);
       const userSnap = await getDoc(userRef);

       if (userSnap.exists()) {
           return userSnap.data().orders;
       } else {
           thunkAPI.rejectWithValue('User not found');
       }
   } catch (error) {
       thunkAPI.rejectWithValue('Something went wrong. Please try again after later.');
   }
})