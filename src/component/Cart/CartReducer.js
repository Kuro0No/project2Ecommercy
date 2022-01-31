import React from 'react';

export const CartReducer = (state, action) => {
    const { shoppingCart, totalPrice, qty } = state
    let product;
    let index;
    let updatePrice;
    let updateQty;


    switch (action.type) {
        case 'add_to_cart':
            const check = shoppingCart.find(product => product.id == action.id)
            if (check) {
                return state
            } else {
                product = action.product
                product['qty'] = 1
                updateQty = qty + 1
                updatePrice = totalPrice + product.price
                return { shoppingCart: [product, ...shoppingCart], totalPrice: updatePrice, qty: updateQty }
            }
        case 'increaseProduct':
            product = action.cart
            product.qty = product.qty + 1
            updateQty = qty
            updatePrice = totalPrice + product.price

            return { shoppingCart: [...shoppingCart], qty: updateQty, totalPrice: updatePrice }
        case 'decreaseProduct':

            product = action.cart
            if (product.qty > 1) {

                product.qty = product.qty - 1
                updateQty = qty
                updatePrice = totalPrice - product.price
            } else {
                return state
            }

            return { shoppingCart: [...shoppingCart], qty: updateQty, totalPrice: updatePrice }
        case 'deleteProduct':
            const filterd = shoppingCart.filter(product => product.id !== action.id)

            product = action.cart
            updateQty = qty - 1
            updatePrice = totalPrice - product.price * product.qty
            return { shoppingCart: [...filterd], qty: updateQty, totalPrice: updatePrice, }
            break;
            case 'add_qty_product':
            

            console.log('add')
            return { shoppingCart: [...shoppingCart], qty: updateQty, totalPrice: updatePrice, }
            break;

        default:
            return state

    }


}
