import { useContext } from "react";
import { useParams } from "react-router-dom";
import { productContext } from "../../ProductContext/ProductContext";
import { CartContext } from "../Cart/CartContext";
import './ProductDetail.scss'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../AuthContext/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Rate } from 'antd';
import { ShoppingCartOutlined, CheckCircleOutlined, FieldTimeOutlined, CarOutlined, CalendarOutlined } from '@ant-design/icons';
import { dbContext } from "../../DbContext/dbContext";
import { headerContext } from "../HeaderContext/HeaderContext";



const ProductDetail = () => {
    const { id } = useParams()
    const { currentUser } = useAuth()
    const currentUserUid = currentUser && currentUser.uid
    const products = useContext(productContext).products
    let productDetail = products.find(item => item.id == id)
    // const shoppingCart = useContext(CartContext).shoppingCart
    // const { qty, totalPrice } = useContext(CartContext)
    const { loading } = useContext(productContext)


    const dbCart = useContext(dbContext).currentUserCart.shoppingCart
    const dbUserCart = useContext(dbContext).currentUserCart
    // const setLoadingDb = useContext(dbContext).setLoading
    const headerContextState = useContext(headerContext)

    const { dispath } = useContext(CartContext)
    const handleAdd = async () => {
        if (!currentUser) { dispath({ type: 'add_to_cart', id: productDetail.id, product: productDetail }) }
        if (currentUser) {
            const check = dbCart.find(product => product.id === productDetail.id)
            if (check) {
                return toast.warn('The product is already in your cart!', {
                    autoClose: 1500,
                });
            } else {
                if (productDetail) {
                    productDetail.price = Math.floor(productDetail.price)
                }
                productDetail['qty'] = 1

                headerContextState.setHeaderState({
                    shoppingCart: [productDetail, ...dbCart], qty: dbUserCart.qty + 1, totalPrice: Math.floor(dbUserCart.totalPrice) + Math.floor(productDetail.price)
                })
                const userRef = doc(db, "user", currentUser && currentUserUid);
                await setDoc(userRef,
                    {
                        shoppingCart: [productDetail, ...dbCart],
                        qty: dbUserCart.qty + 1,
                        totalPrice: (Math.floor(dbUserCart.totalPrice) + Math.floor(productDetail.price)),
                        passwordUser:dbUserCart.passwordUser,
                        avatar: dbUserCart.avatar
                    });
                toast.success('Add successfully!', {
                    autoClose: 1500,
                });
            }
        }
    }

    const buyAtProductDetail = () => {
        if (!currentUser) { toast.warn('You need to login to buy this product!', { autoClose: 1500 }) }
    }


    return <div>
        <div className="d-flex productDetail">
            {loading &&
                <>
                    <div className="col-6 left"><img src="https://semantic-ui.com/images/wireframe/square-image.png" className="card-img-top" alt="..." /></div>
                    <div className="col-6 right">

                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </p>
                            <div className="d-flex">

                                <a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-3 me-5"></a>
                                <a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-3"></a>
                            </div>
                        </div>
                    </div>
                </>}
            {products.length > 0 &&
                <>
                    <div className="col-6 left"><img src={productDetail.image} alt="" /></div>
                    <div className="col-6 right">
                        <div>


                            <div className="title-productDetail">
                                <h1>{productDetail.title}</h1>
                            </div>
                            <div className="pb-2 star-productDetail">
                                <div>
                                    <span >{productDetail.rating.rate}
                                        <Rate allowHalf disabled value={productDetail.rating.rate} />
                                    </span>
                                </div>
                                <div>

                                    <span >{productDetail.rating.count} review</span>
                                </div>

                            </div>
                            <div className="price-productDetail">
                                <h4 > ${Math.floor(productDetail.price)}</h4>
                            </div>
                            <div className="desciption-productDetail">
                                <p > {productDetail.description}</p>
                            </div>
                            <div className="py-3">
                                <button type="button" className="btn btn-outline-primary btn-lg" onClick={handleAdd}><ShoppingCartOutlined />   Add To Cart</button>
                                <button type="button" onClick={buyAtProductDetail} className="btn btn-outline-danger btn-lg">Buy Now!</button>
                            </div>
                            <div className="policy">
                                <div className="isStock">
                                    <label>Availability:<CheckCircleOutlined /> In Stock.</label>
                                </div>
                                <div>
                                    <FieldTimeOutlined />
                                    <label>Order by 12pm EST to ship same business day</label>
                                </div>
                                <div>
                                    <CarOutlined />
                                    <label>Free shipping VN on orders $45+ USD</label>

                                </div>
                                <div>
                                    <CalendarOutlined />
                                    <label>60 Day Happiness Guarantee</label>

                                </div>

                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>;
};

export default ProductDetail;
