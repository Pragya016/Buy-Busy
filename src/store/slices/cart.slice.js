import { createSlice } from "@reduxjs/toolkit"
import { addToCart, getProducts } from "../firebase.services";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            return [action.payload, ...state];
        })

        builder.addCase(getProducts.fulfilled, (state, action) => {
            console.log(action.payload)
            return action.payload;
        })
    }
})

export default cartSlice.reducer;