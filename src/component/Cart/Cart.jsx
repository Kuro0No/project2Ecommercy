import React from 'react';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import Header from '../Header/Header';
import { CartContext } from './CartContext';
import './Cart.scss'
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';

const Cart = () => {
    const data = useContext(CartContext).shoppingCart
    const { dispath } = useContext(CartContext)
    const dataqty = useContext(CartContext).qty
    const datatotalPrice = useContext(CartContext).totalPrice
    const [checked, setChecked] = useState(false)
    const { currentUser } = useAuth()
    const [currentUserCart, setcurrentUserCart] = useState([])

    useEffect(() => {
        async function getdata() {

            const querySnapshot = await getDocs(collection(db, "user"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setcurrentUserCart(doc.data().shoppingCart)
            });

        }
        getdata()
    }, [])
    // currentUser && currentUserCart && currentUserCart.map((usercart) => {
    //     console.log(usercart.title)
    // })



    const increase = (cart) => {
        dispath({ type: 'increaseProduct', id: cart.id, cart: cart })

    }
    const decrease = (cart) => {
        dispath({ type: 'decreaseProduct', id: cart.id, cart: cart })

    }
    const deleteCart = (cart) => {
        dispath({ type: 'deleteProduct', id: cart.id, cart: cart })

    }
    const payment = () => {
        if (!currentUser) {
            toast.warn('You need to login to pay for products', { autoClose: 1500 })
        }
    }
    return <div>
        <Header />
        <div className='cart-container'>


            <div className='mb-5'><h1>Shopping Cart</h1></div>
            <div className='tabel-cart'>


                <div className='col-8'>
                    <table className="table" >
                        <thead className='text-center '>
                            <tr >
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>

                            {currentUser && currentUserCart  ? currentUserCart.map((userCart,index) => {
                                return <tr key={index} className="align-middle cart-tabel">
                                    <td scope="row" className='cart-img col-6'>
                                        <div className='d-flex align-items-center   '>
                                            <img src={userCart.image} alt="" />
                                            <label>{userCart.title}</label>
                                        </div>
                                    </td>
                                    <td >
                                        <div className='changeQty'>
                                            <button onClick={() => increase(userCart)} className='btn btn-outline-danger'><i className="bi bi-plus"></i></button>
                                            <div>{userCart.qty}</div>
                                            <button onClick={() => decrease(userCart)} className='btn btn-outline-danger'><i className="bi bi-dash-lg"></i></button>
                                        </div>

                                    </td>
                                    <td>{userCart.price * userCart.qty} </td>
                                    <td>
                                        <button onClick={() => deleteCart(userCart)} className='btn btn-danger'>Delete</button>

                                    </td>
                                </tr>
                            })
                                :
                                data.map((cart, index) => {

                                    return <tr key={index} className="align-middle cart-tabel">
                                        <td scope="row" className='cart-img col-6'>
                                            <div className='d-flex align-items-center   '>
                                                <img src={cart.image} alt="" />
                                                <label>{cart.title}</label>
                                            </div>
                                        </td>
                                        <td >
                                            <div className='changeQty'>
                                                <button onClick={() => increase(cart)} className='btn btn-outline-danger'><i className="bi bi-plus"></i></button>
                                                <div>{cart.qty}</div>
                                                <button onClick={() => decrease(cart)} className='btn btn-outline-danger'><i className="bi bi-dash-lg"></i></button>
                                            </div>

                                        </td>
                                        <td>{cart.price * cart.qty} </td>
                                        <td>
                                            <button onClick={() => deleteCart(cart)} className='btn btn-danger'>Delete</button>

                                        </td>
                                    </tr>

                                })
                            }





                            {/* {dataqty == 0 ? <tr>
                                <td colSpan='4'>Empty Cart! <Link to='/product'>Shop now!</Link></td>
                            </tr> :
                                data.map((cart, index) => {

                                    return <tr key={index} className="align-middle cart-tabel">
                                        <td scope="row" className='cart-img col-6'>
                                            <div className='d-flex align-items-center   '>
                                                <img src={cart.image} alt="" />
                                                <label>{cart.title}</label>
                                            </div>
                                        </td>
                                        <td >
                                            <div className='changeQty'>
                                                <button onClick={() => increase(cart)} className='btn btn-outline-danger'><i className="bi bi-plus"></i></button>
                                                <div>{cart.qty}</div>
                                                <button onClick={() => decrease(cart)} className='btn btn-outline-danger'><i className="bi bi-dash-lg"></i></button>
                                            </div>

                                        </td>
                                        <td>{cart.price * cart.qty} </td>
                                        <td>
                                            <button onClick={() => deleteCart(cart)} className='btn btn-danger'>Delete</button>

                                        </td>
                                    </tr>

                                })} */}


                        </tbody>
                    </table>
                </div>
                <div className="card text-white bg-danger mb-3 col-3" >
                    <h3 className="card-header text-center">DETAIL</h3>
                    <div className="card-body">
                        <h5 className="card-title">Total Product: {dataqty}</h5>
                        <h5 className="card-text">Total Price : {dataqty * datatotalPrice}$</h5>
                        <small className="card-text">Be careful! Before buying this product, you need to carefully check all the product in your cart! </small>
                        <div className='mb-5'>
                            <input type="checkbox" name="" id="" className='mx-3' checked={checked} onChange={(e) => setChecked(!checked)} />
                            <label htmlFor="">I checked</label>
                        </div>
                        <button onClick={payment} style={{ width: '100%' }} disabled={!checked || dataqty == 0} type="button" className="btn btn-primary">Payment</button>
                    </div>
                </div>
            </div>
        </div>

    </div>;
};

export default Cart;
