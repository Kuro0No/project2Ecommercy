import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../AuthContext/AuthContext";
import { useLocation } from "react-router-dom";
import { CartContext } from "../component/Cart/CartContext";

export const dbContext = createContext()

const DbContextProvider = ({ children }) => {

    const [currentUserCart, setcurrentUserCart] = useState({})
    const { currentUser } = useAuth()
    const [dataInit, setDataInit] = useState({})
    const data = useContext(CartContext).shoppingCart

    useEffect(() => {
        if (currentUser) {
                const unsub = onSnapshot(doc(db, "user", currentUser.uid), (doc) => {
                    setcurrentUserCart(doc.data())
                });

            }



        }, [currentUser])

    return <dbContext.Provider value={{ currentUserCart, setcurrentUserCart }}>
        {children}
    </dbContext.Provider>
}

export default DbContextProvider