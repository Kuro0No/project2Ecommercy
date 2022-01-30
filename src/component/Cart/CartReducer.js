import React from 'react';

export const CartReducer =(state, action) => {
    const {shoppingCart, totalPrice, qty } = state
    let product;
    let index;
    let updatePrice;
    let updateQty;


    switch(action.type) {
        case 'add_to_cart' : 
        const check = shoppingCart.find(product => product.id == action.id)
        if (check) {
            return state
        } else {
            product = action.product
            product['qty'] = 1 
            updateQty = qty +1
            updatePrice = totalPrice + product.price
            return {shoppingCart: [product,...shoppingCart ], totalPrice: updatePrice, qty: updateQty}
        }
        break;

        default:
            return state
        
    }


}
