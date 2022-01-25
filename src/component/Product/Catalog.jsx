import React from 'react';
import { useState } from 'react/cjs/react.development';
import { memo } from 'react';

const Catalog = () => {
    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]
    const sortByPrice = ["Increase", "Decrease"]
    const [checkedCategory,setCheckedCategory] = useState()
    const [checkedPirce,setCheckedPrice] = useState()
    const onChangeCategory =(category) => {
        setCheckedCategory(category)
    }
    const onChangPrice =(sortPrice) => {
        setCheckedPrice(sortPrice)
    }
    

    return <div>
        <div> Categories </div>
        {categories.map((category, index) => (
            <div className='p-2' key={index}>
                <input className="form-check-input mt-0 " checked={checkedCategory == category} onChange={()=> onChangeCategory(category)} type="radio" aria-label="Checkbox for following text input" />
                <label className='ps-3'>{category.toUpperCase()}</label>
            </div>
        ))}

        <div>Price</div>
        {sortByPrice.map((sortPrice, index) => (
            <div className='p-2' key={index}>
                <input className="form-check-input mt-0" type="radio" checked={checkedPirce == sortPrice} onChange={()=> onChangPrice(sortPrice)} aria-label="Checkbox for following text input" />
                <label  className='ps-3'>{sortPrice.toUpperCase()}</label>
            </div>
        ))}


    </div>;
};

export default memo(Catalog);
