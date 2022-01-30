import React from 'react';
import { useContext } from 'react/cjs/react.development';
import Header from '../Header/Header';
import { CartContext } from './CartContext';
import './Cart.scss'

const Cart = () => {
    const data = useContext(CartContext).shoppingCart
    data.map(cart => console.log(cart))
    return <div>
        <Header />
        <div className='cart-container'>


            <div className='mb-5'><h1>Shopping Cart</h1></div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cart => {
                            
                            return <tr key={cart.id}>
                                <th scope="row" className='cart-img'><img src={cart.image} alt="" /></th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>

                        })}

                        
                    </tbody>
                </table>
            </div>
        </div>

    </div>;
};

export default Cart;
