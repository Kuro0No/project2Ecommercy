import { useEffect, useState } from "react";
import { createContext } from "react/cjs/react.production.min";
import axios from "axios";



export const productContext = createContext()

const ProductContextProvide = ({ children }) => {
    const [products, setProducts] = useState([])
    const [loading,setLoading] = useState(true)
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
    

    return <productContext.Provider value={{ products: [...products], loading }}>
        {children}
    </productContext.Provider>;
};

export default ProductContextProvide;
