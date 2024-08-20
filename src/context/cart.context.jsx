import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export function useCartContext() {
    return useContext(cartContext);
}

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [removeStatus, setRemoveStatus] = useState({status : false, message : ''});

    return (
        <cartContext.Provider value={{cart, setCart, removeStatus, setRemoveStatus}}>
            {children}
        </cartContext.Provider>
    )
}