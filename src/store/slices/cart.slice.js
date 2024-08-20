import { createSlice } from "@reduxjs/toolkit"
import { addToCart, getProducts, removeFromCart } from "../firebase.services";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            return action.payload;
        })

        builder.addCase(getProducts.fulfilled, (state, action) => {
            return action.payload;
        })

        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export default cartSlice.reducer;