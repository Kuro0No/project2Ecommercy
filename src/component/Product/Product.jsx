import axios from "axios";
import { useContext, useEffect, useState } from "react";
import './Products.scss'
import Pagination from "./Pagination";
import Catalog from "./Catalog";
import { productContext } from "../../ProductContext/ProductContext";
import { Link } from "react-router-dom";

const Product = () => {

    const products = useContext(productContext).products
    // const [products, setProducts] = useState([])
    const [getProducts, setGetProducts] = useState([])

    console.log(products)
    
    
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(8)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
    const totalPage = Math.ceil(products.length / productsPerPage)


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)

    }
    const handlePre = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1)


    }
    const handleNext = () => {
        currentPage < totalPage && setCurrentPage(currentPage + 1)
    }

    return (
        <>
            <div className="product-container d-flex">
                <div className="catalog col-3">
                    <Catalog  getProducts={getProducts} products={products} />
                </div>
                <div className="product col-9">
                    <div className="row">
                        {currentProducts.map((product, index) => {


                            return <Link onClick={() => window.scrollTo(0,0)} to ={`${product.title}/${product.id}`} key={index} className="col-6 col-sm-6 col-md-4 pb-3">
                                <div className="card" >
                                    <img src={product.image} className="card-img-top products-image" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title products-title">{product.title}</h5>
                                        <p className="card-text">${product.price}</p>
                                        <button  className="btn btn-primary">Add to cart</button>
                                    </div>
                                </div>
                            </Link>
                        })}
                        <div className="mt-4">
                            <Pagination currentPage={currentPage} productsPerPage={productsPerPage} handleNext={handleNext} paginate={paginate} handlePre={handlePre} totalProductsLength={products.length} />
                        </div>
                    </div>
                </div>
            </div>;
        </>)
};

export default Product;
