import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { productContext } from "../../ProductContext/ProductContext";
import './ProductDetail.scss'

const ProductDetail = () => {
    const { title, id } = useParams()

    const products = useContext(productContext).products
    let productDetail = products.find(item => item.id == id)
    console.log(products)
    const [quantity, setQuantity] = useState(1)
    const decreaseQuantity = () => {
        quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)

    }


    return <div>
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
                                <span>{productDetail.price}</span>
                            </div>
                            <div>
                                <span>Rate: {productDetail.rating.rate}</span>
                                <span> {productDetail.rating.count} review</span>
                            </div>

                            <div className="quantityHandle">
                                <div>

                                    <i className="bi bi-plus-lg" onClick={() => setQuantity(quantity + 1)}></i>
                                </div>
                                <div>

                                    <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                <div>

                                    <i className="bi bi-dash-lg" onClick={decreaseQuantity}></i>
                                </div>

                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary btn-lg">Add To Cart</button>
                                <button type="button" className="btn btn-outline-danger btn-lg">Buy Now!</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>;
};

export default ProductDetail;
