import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "../AuthContext/AuthContext";
import { useLocation } from "react-router-dom";
import { CartContext } from "../component/Cart/CartContext";

export const dbContext = createContext()

const DbContextProvider = ({ children }) => {

    const [currentUserCart, setcurrentUserCart] = useState({})
    const { currentUser } = useAuth()
    const data = useContext(CartContext).shoppingCart
    useEffect(() => {
        if (currentUser) {
            async function getdata() {
                const docRef = doc(db, "user", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setcurrentUserCart(docSnap.data())
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            getdata()
        }
    }, [currentUser])

    return <dbContext.Provider value={{currentUserCart}}>
        {children}
    </dbContext.Provider>
}

export default DbContextProvider