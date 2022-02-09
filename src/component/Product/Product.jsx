import { useContext, useEffect, useState } from "react";
import './Products.scss'
import Pagination from "./Pagination";
import Catalog from "./Catalog";
import { productContext } from "../../ProductContext/ProductContext";
import { Link } from "react-router-dom";


const Product = () => {

    const productsInit = useContext(productContext).products
    const [products, setProducts] = useState([])
    useEffect(() => {
        setProducts(productsInit)
    }, [productsInit])

    const skeleLopArray = [1, 2, 3, 4, 5, 6, 7, 8]
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(8)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
    const totalPage = Math.floor(products.length / productsPerPage)
    const [height, setHeight] = useState(window.innerWidth / 4.1)
    const { loading } = useContext(productContext)






    useEffect(() => {
        const resizeHandle = () => {
            if (window.innerWidth > 767) {

                setHeight(window.innerWidth / 4.1)
            }

            if (window.innerWidth <= 767) {
                setHeight(window.innerWidth / 4)

            }

        }
        window.addEventListener('resize', resizeHandle)

        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)

    }
    const handlePre = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1)


    }
    const handleNext = () => {
        currentPage <= totalPage && setCurrentPage(currentPage + 1)
    }


    return (
        <>

            <div className="product-container d-flex">
                <div className="catalog col-md-3 col-5">
                    <Catalog setProducts={setProducts} productsInit={productsInit} setCurrentPage={setCurrentPage} />
                </div>
                <div className="product col-7 col-md-9">
                    <div className="row">


                        {loading && skeleLopArray.map(number => {

                            return (
                                <div key={number} className="col-6 col-sm-6  col-md-4 pb-3 ">
                                    <div className="card " aria-hidden="true">
                                        <img src="https://semantic-ui.com/images/wireframe/square-image.png" className="card-img-top card-img-top products-image" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title placeholder-glow products-title">
                                                <span className="placeholder col-6"></span>
                                            </h5>
                                            <p className="card-text placeholder-glow">
                                                <span className="placeholder col-7"></span>
                                                <span className="placeholder col-4"></span>
                                                <span className="placeholder col-4"></span>
                                                <span className="placeholder col-6"></span>
                                                <span className="placeholder col-8"></span>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}


                        {currentProducts.map((product, index) => {
                            return (

                                <div key={index} className="col-6 col-sm-6 col-md-4 px-1 pb-3 product-container-thumb">
                                    <div className="card">

                                        <Link onClick={() => window.scrollTo(0, 0)} to={`${product.title}/${product.id}`} key={index} >
                                            <div  >
                                                <img src={product.image} height={height} className="card-img-top products-image" alt="..." />
                                                <div className="card-body ">
                                                    <h5 className="card-title products-title">{product.title}</h5>
                                                    <p className="card-text">${Math.floor(product.price)}</p>
                                                </div>
                                            </div>
                                        </Link>

                                    </div>
                                </div>


                            )
                        })}
                    </div>
                </div>
            </div>;
            <div className="mt-4">
                <Pagination currentPage={currentPage} productsPerPage={productsPerPage} handleNext={handleNext} paginate={paginate} handlePre={handlePre} totalProductsLength={products.length} />
            </div>
        </>)
};

export default Product;
