import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import cartReducer from "./slices/cart.slice.js";

const store = configureStore({
    reducer: {
        cart : cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;