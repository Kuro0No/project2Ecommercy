import React from 'react';
import { useContext, useState } from 'react/cjs/react.development';
import Header from '../Header/Header';
import { CartContext } from './CartContext';
import './Cart.scss'
import { Link } from 'react-router-dom';

const Cart = () => {
    const data = useContext(CartContext).shoppingCart
    const { dispath } = useContext(CartContext)
    const dataqty = useContext(CartContext).qty
    const datatotalPrice = useContext(CartContext).totalPrice
    const [checked,setChecked ] = useState(false)

    console.log(useContext(CartContext))
    

    const increase = (cart) => {
        dispath({ type: 'increaseProduct', id: cart.id, cart: cart })

    }
    const decrease = (cart) => {
        dispath({ type: 'decreaseProduct', id: cart.id, cart: cart })

    }
    const deleteCart = (cart) => {
        dispath({ type: 'deleteProduct', id: cart.id, cart: cart })

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
                            {dataqty == 0 ? <tr>
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

                                })}


                        </tbody>
                    </table>
                </div>
                <div class="card text-white bg-danger mb-3 col-3" >
                    <div class="card-header text-center">DETAIL</div>
                    <div class="card-body">
                        <h5 class="card-title">Total Product: {dataqty }</h5>
                        <p class="card-text">Total Price : {dataqty * datatotalPrice}</p>
                        <p class="card-text">Be careful! Before buying this product, you need to carefully check all the product in your cart! </p>
                        <div className='mb-5'>
                            <input type="checkbox" name="" id=""  className='mx-3' checked={checked} onChange={(e) => setChecked(!checked)}/>
                            <label htmlFor="">I checked</label>
                        </div>
                        <button disabled={!checked} type="button" class="btn btn-primary">Payment</button>
                    </div>
                </div>
            </div>
        </div>

    </div>;
};

export default Cart;
