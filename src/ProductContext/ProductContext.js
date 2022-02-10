import { useEffect, useState } from "react";
import { createContext } from "react/cjs/react.production.min";
import axios from "axios";
import { db } from '../firebase'
import { collection, setDoc, doc, addDoc } from "firebase/firestore";



export const productContext = createContext()

const ProductContextProvide = ({ children }) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            let res = await axios.get('https://fakestoreapi.com/products')
            let data = res && res.data ? res.data : []
            setProducts(data)
            setLoading(false)

        }
        fetchData()


    }, [])
    useEffect(() => {

        const a = products.forEach(async product => {
            await setDoc(doc(db, "posts", `${product.id}`), {
                userUID: '',
                
            });


        })

    }, [products.length >0])


    return <productContext.Provider value={{ products: [...products], loading }}>
        {children}
    </productContext.Provider>;
};

export default ProductContextProvide;
