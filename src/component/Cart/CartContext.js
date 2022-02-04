import { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {

    const [cart, dispath] = useReducer(CartReducer, {
        shoppingCart: [],
        totalPrice: 0,
        qty: 0
    })

    return (
        <CartContext.Provider value={{ ...cart, dispath }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
