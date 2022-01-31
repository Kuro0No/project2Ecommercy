import { useEffect, useState } from "react";
import { createContext } from "react/cjs/react.production.min";
import axios from "axios";
import { useLocation } from "react-router-dom";



export const productContext = createContext()

const ProductContextProvide = ({ children }) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchData() {
            let res = await axios.get('https://fakestoreapi.com/products')
            let data = res && res.data ? res.data : []
            setProducts(data)
            
            
        }
        fetchData()
        
    }, [])
    


    return <productContext.Provider value={{products: [...products]}}>
        {children}
    </productContext.Provider>;
};

export default ProductContextProvide;
