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
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        if (currentUser) {
            const unsub = onSnapshot(doc(db, "user", currentUser.uid), (doc) => {
                setcurrentUserCart(doc.data())
            });
            setLoading(false)
            return unsub
        }
    }, [currentUser])

    return <dbContext.Provider value={{ currentUserCart, setcurrentUserCart, loading }}>
        {children}
    </dbContext.Provider>
}

export default DbContextProvider