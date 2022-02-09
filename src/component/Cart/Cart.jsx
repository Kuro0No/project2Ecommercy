import React from 'react';
import { useContext, useState } from 'react/cjs/react.development';
import { CartContext } from './CartContext';
import './Cart.scss'
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { dbContext } from '../../DbContext/dbContext';
import { doc, setDoc, updateDoc, arrayRemove } from "firebase/firestore";




const Cart = () => {
    const data = useContext(CartContext).shoppingCart
    const { dispath } = useContext(CartContext)
    const dataqty = useContext(CartContext).qty
    const datatotalPrice = useContext(CartContext).totalPrice
    const [checked, setChecked] = useState(false)
    const { currentUser } = useAuth()

    const currentUserCart = useContext(dbContext).currentUserCart.shoppingCart
    const dataUserCart = useContext(dbContext)
    

    const increase = (cart, id) => {
        if (!currentUser) dispath({ type: 'increaseProduct', id: cart.id, cart: cart })
        if (currentUser) {

            // To increase in firebase :
            const productAfter = currentUserCart.find(item => item.id === cart.id);
            productAfter.qty = productAfter.qty + 1
            const replaceUserCart = currentUserCart.indexOf(cart)
            if (replaceUserCart !== -1) {
                currentUserCart[replaceUserCart] = productAfter
            }

            setDoc(doc(db, 'user', currentUser.uid),
                {
                    shoppingCart: currentUserCart,
                    qty: dataUserCart.currentUserCart.qty,
                    totalPrice: Math.floor(dataUserCart.currentUserCart.totalPrice) + Math.floor(cart.price),
                    avatar: dataUserCart.currentUserCart.avatar,
                    passwordUser: dataUserCart.currentUserCart.passwordUser
                });
        }
    };




    const decrease = (cart) => {
        if (!currentUser) return dispath({ type: 'decreaseProduct', id: cart.id, cart: cart })


        // to Decrease in firebase
        if (currentUser) {

            const productAfter = currentUserCart.find(item => item.id === cart.id);
            if (productAfter.qty > 1) {

                productAfter.qty = productAfter.qty - 1
                const replaceUserCart = currentUserCart.indexOf(cart)
                if (replaceUserCart !== -1) {
                    currentUserCart[replaceUserCart] = productAfter
                }

                setDoc(doc(db, 'user', currentUser.uid),
                    {
                        shoppingCart: currentUserCart,
                        qty: dataUserCart.currentUserCart.qty,
                        totalPrice: Math.floor(dataUserCart.currentUserCart.totalPrice) - Math.floor(cart.price),
                        avatar: dataUserCart.currentUserCart.avatar,
                        passwordUser: dataUserCart.currentUserCart.passwordUser
                    });
            }
        }

    }
    const deleteCart = async (cart) => {
        if (!currentUser) dispath({ type: 'deleteProduct', id: cart.id, cart: cart })
        if (currentUser) {
            const userRef = doc(db, 'user', currentUser.uid);

            // Remove the 'capital' field from the document
            await updateDoc(userRef, {
                //     shoppingCart: deleteField()
                shoppingCart: arrayRemove(cart),
                qty: dataUserCart.currentUserCart.qty - 1,
                totalPrice: (dataUserCart.currentUserCart.totalPrice - (cart.price * cart.qty))
            });


        }

    }
    const payment = () => {
        if (!currentUser) {
            toast.warn('You need to login to pay for products', { autoClose: 1500 })
        }
    }
    return <div>
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


                            {!currentUser && dataqty === 0 &&
                                <tr>
                                    <td colSpan='4' style={{fontSize: '20px'}}>Empty Cart! <Link to='/product'>Shop now!</Link></td>
                                </tr>
                            }
                            {currentUser && dataUserCart.currentUserCart?.qty === 0 &&
                                <tr>
                                    <td colSpan='4' style={{fontSize: '20px'}}>Empty Cart! <Link to='/product'>Shop now!</Link></td>
                                </tr>
                            }

                            {currentUserCart && currentUser ?
                                currentUserCart.map((userCart, index) => {
                                    return <tr key={index} className="align-middle cart-tabel">
                                        <td scope="row" className='cart-img col-6'>
                                            <div className='d-flex align-items-center   '>
                                                <img  src={userCart.image} alt="" />
                                                <label className='title-cart-group'>{userCart.title}</label>
                                            </div>
                                        </td>
                                        <td >
                                            <div className='changeQty'>
                                                <button onClick={() => increase(userCart, index)} className='btn btn-outline-danger'><i className="bi bi-plus"></i></button>
                                                <div>{userCart.qty}</div>
                                                <button onClick={() => decrease(userCart, index)} className='btn btn-outline-danger'><i className="bi bi-dash-lg"></i></button>
                                            </div>

                                        </td>
                                        <td>${Math.floor(Math.floor(userCart.price) * userCart.qty)} </td>
                                        <td className='trash-del'>
                                            {/* <button onClick={() => deleteCart(userCart)} className='btn btn-danger'>Delete</button> */}
                                            <i onClick={() => deleteCart(userCart)} className='bi bi-trash' ></i>

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
                                                <button onClick={() => increase(cart, index)} className='btn btn-outline-danger'><i className="bi bi-plus"></i></button>
                                                <div>{cart.qty}</div>
                                                <button onClick={() => decrease(cart, index)} className='btn btn-outline-danger'><i className="bi bi-dash-lg"></i></button>
                                            </div>

                                        </td>
                                        <td>{cart.price * cart.qty} </td>
                                        <td>
                                            {/* <button onClick={() => deleteCart(cart)} className='btn btn-danger'>Delete</button> */}

                                            <i onClick={() => deleteCart(cart)} className=' bi bi-trash ' ></i>

                                        </td>
                                    </tr>

                                })

                            }


                        </tbody>
                    </table>
                </div>
                <div className="card text-white bg-danger mb-3 col-3 cardPayment" >
                    <h3 className="card-header text-center">DETAIL</h3>
                    <div className="card-body">
                        <h5 className="card-title">Total Product: {currentUser ? (dataUserCart.currentUserCart.qty) : dataqty}</h5>
                        <h5 className="card-text">Total Price : {currentUser ? (Math.floor(dataUserCart.currentUserCart.totalPrice) * dataUserCart.currentUserCart.qty) : datatotalPrice}$</h5>
                        <small className="card-text">Be careful! Before buying this product, you need to carefully check all the product in your cart! </small>
                        <div className='mb-5'>
                            <input type="checkbox" name="" id="" className='mx-3' checked={checked} onChange={(e) => setChecked(!checked)} />
                            <label htmlFor="">I checked</label>
                        </div>
                        <button onClick={payment} style={{ width: '100%' }} disabled={!checked || (currentUser ? dataUserCart.currentUserCart.qty === 0 || dataUserCart.currentUserCart.length === 0 : dataqty === 0)} type="button" className="btn btn-primary">Payment</button>
                    </div>
                </div>
            </div>
        </div>

    </div>;
};

export default Cart;
