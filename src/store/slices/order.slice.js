import { createSlice } from "@reduxjs/toolkit";
import { getOrders, placeOrder } from "../firebase.services";

const orderSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            return action.payload;
        })

        builder.addCase(getOrders.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export default orderSlice.reducer;