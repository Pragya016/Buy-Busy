import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import cartReducer from "./slices/cart.slice.js";
import ordersReducer from "./slices/order.slice.js";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        orders : ordersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;