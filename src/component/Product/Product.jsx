import axios from "axios";
import { useEffect, useState } from "react";
import './Products.scss'
import Pagination from "./Pagination";


const Product = () => {
    

    const [products, setProducts] = useState([])
    useEffect(async () => {
        let res = await axios.get('https://fakestoreapi.com/products')
        let data = res && res.data ? res.data : []
        setProducts(data)
        console.log(data.length)



    }, [])
    
    const [currentPage, setCurrentPage ] = useState(1)
    const [productsPerPage] = useState(8)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
    const paginate =(pageNumber) => {
        setCurrentPage(pageNumber)
    }
    


    


    return <div className="product-container d-flex">
        <div className="catalog col-3">a</div>
        <div className="product col-9">
            <div className="row">
                {currentProducts.map((product, index) => (
                    <div key={index} className="col-6 col-sm-6 col-md-4">
                        <div className="card" >
                            <img src={product.image} className="card-img-top products-image" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title products-title">{product.title}</h5>
                                <p className="card-text">${product.price}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                ))}
            <Pagination productsPerPage={productsPerPage} paginate={paginate} totalProducts={products.length}/>
            </div>
        </div>
    </div>;
};

export default Product;
