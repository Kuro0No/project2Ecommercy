import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { productContext } from "../../ProductContext/ProductContext";
import { CartContext } from "../Cart/CartContext";
import Header from "../Header/Header";
import './ProductDetail.scss'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../AuthContext/AuthContext";

const ProductDetail = () => {
    const { title, id } = useParams()
    const {currenUser} = useAuth()

    const products = useContext(productContext).products
    let productDetail = products.find(item => item.id == id)
  
    const shoppingCart = useContext(CartContext)
    // console.log(productDetail)
    const {dispath} = useContext(CartContext)
    const handleAdd = () => {
        dispath({type: 'add_to_cart', id: productDetail.id , product: productDetail})
    }
    const handleAddQty = () => {
        console.log('add')
        dispath({type: 'add_qty_product'})
    }
    const buyAtProductDetail =() => {
        if(!currenUser ) { toast.warn('You need to login to buy this product!', {autoClose: 1500})}
    }


    return <div>
        <Header />
        <div className="d-flex productDetail">
            {products.length > 0 &&
                <>

                    <div className="col-6 left"><img src={productDetail.image} alt="" /></div>
                    <div className="col-6 right">
                        <div>
                            <div>
                                <h1>{productDetail.title}</h1>
                            </div>
                            <div>
                                <h4 >Price: {productDetail.price}$</h4>
                            </div>
                            <div className="py-3">
                                <span>Rate: {productDetail.rating.rate}</span>
                                <span> {productDetail.rating.count} review</span>
                            </div>

                        
                            <div>
                                <button type="button" className="btn btn-outline-primary btn-lg" onClick={handleAdd}>Add To Cart</button>
                                <button type="button" onClick={buyAtProductDetail} className="btn btn-outline-danger btn-lg">Buy Now!</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>;
};

export default ProductDetail;
