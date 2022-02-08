import React, { useContext } from 'react';
import { useState } from 'react/cjs/react.development';
import { memo } from 'react';
import { productContext } from '../../ProductContext/ProductContext';
import { useLocation } from 'react-router-dom';


const Catalog = ({ setProducts, productsInit, setCurrentPage }) => {
    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]
    // const sortByPrice = ["Increase", "Decrease"]
    const [checkedCategory, setCheckedCategory] = useState()
    // const [checkedPirce, setCheckedPrice] = useState()
    const products = useContext(productContext).products

    const location = useLocation()



    const onChangeCategory = (category) => {
        setCheckedCategory(category)
        const filter = products.filter(product => product.category === category)
        if (category === 'electronic') {
            setProducts(filter)
        } else if (category === 'jewelery') {
            setProducts(filter)

        } else if (category === "men's clothing") {
            setProducts(filter)

        } else {
            setProducts(filter)

        }
        setCurrentPage(1)

    }

    // const onChangPrice = (sortPrice) => {
    //     setCheckedPrice(sortPrice)
    //     // const sortProduct = products.sort((a,b) => a-b)
    //     const decreaseSort = products.sort((a, b) => a.price - b.price)
    //     const increaseSort = products.sort((a, b) => b.price - a.price)
    //     console.log(decreaseSort)

    //     if (sortPrice == 'Increase') {
    //         setProducts(increaseSort)
    //     } else {
    //         setProducts(decreaseSort)
    //     }
    // }

    return <div>
        <div style={{fontWeight: 600}}> Categories </div>
        {categories.map((category, index) => (
            <div className='p-2 catalog-group' key={index}>
                <input className="form-check-input mt-0 " checked={checkedCategory === category} onChange={() => onChangeCategory(category)} type="radio" aria-label="Checkbox for following text input" />
                <label className='ps-2'>{category}</label>
            </div>
        ))}

        {/* <div>Price</div>
        {sortByPrice.map((sortPrice, index) => (
            <div className='p-2' key={index}>
                <input className="form-check-input mt-0" type="radio" checked={checkedPirce === sortPrice} onChange={() => onChangPrice(sortPrice)} aria-label="Checkbox for following text input" />
                <label className='ps-3'>{sortPrice.toUpperCase()}</label>
            </div>
        ))} */}
        <div>

            <button onClick={() => {
                setProducts(productsInit)
                setCheckedCategory(false)
                // setCheckedPrice(false)
            }} type="button" className="btn btn-outline-danger">Clear Filter</button>

        </div>

    </div>;
};

export default memo(Catalog);
