import { HomeOutlined, ShopOutlined, ContactsOutlined } from '@ant-design/icons';
import './Modal.scss'
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { productContext } from '../../ProductContext/ProductContext';
import { useRef, useState, useEffect, useContext } from 'react';
import UseDebounce from '../Header/UseDebounce';


const Modal = ({ setOpenActive, openActive }) => {
    const { Search } = Input;


    

    //productContext
    const { products } = useContext(productContext)
    // Search
    const [searchTerm, setSearchTerm] = useState('')
    const [filterSearch, setFilterSearch] = useState([])
    const fielSearchRef = useRef()
    const fieldRef = fielSearchRef?.current


    const debounceSearchTerm = UseDebounce(searchTerm, 500)


    useEffect(() => {

        setFilterSearch(
            products.filter((product, index) => {
                return product.title.toLowerCase().includes(debounceSearchTerm.toLowerCase())
            })
        )
        if (searchTerm == '') {
            setFilterSearch([])
        }
        if (searchTerm.length == 0) {
            fieldRef && (fieldRef.style.display = 'none')
        }
        if (searchTerm.length > 0) {
            fieldRef && (fieldRef.style.display = 'block')
        }

    }, [debounceSearchTerm])

    const blurSearch = () => {
        fieldRef && (fieldRef.style.display = 'none')
    }
    const focusSearch = () => {
        if (searchTerm.length > 0) {
            return fieldRef && (fieldRef.style.display = 'block')
        }

    }

    return <div className={`modal-container ${openActive ? 'modal-container-active' : ''}`}>
        <div className='active-container'>
            <ul>
                <li className='active-li-modal-group'>
                    <Link onClick={() => setOpenActive(false)} to='/'>
                        Home
                        <HomeOutlined />
                    </Link>

                </li>
                <li className='active-li-modal-group'>
                    <Link onClick={() => setOpenActive(false)} to='/product'>
                        Shop Now!
                        <ShopOutlined />
                    </Link>
                </li>

                <li className='active-li-modal-group'>
                    <Link onClick={() => setOpenActive(false)} to='/contact'>
                        Contact Us.
                        <ContactsOutlined />
                    </Link>

                </li>
                <li className='active-li-modal-group input-search-modal'>
                    {/* onBlur={blurSearch} onFocus={focusSearch} */}
                    {/* <Search value={searchTerm} onBlur={blurSearch} onFocus={focusSearch} onChange={e => setSearchTerm(e.target.value)}  placeholder="Search smt..." enterButton /> */}
                    <input type="text" onBlur={blurSearch} onFocus={focusSearch} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}  aria-label="Last name" className="form-control"></input>
                    <i className="bi bi-search"></i>
                </li>
            </ul>
            <div className='modal-search-filter-product' ref={fielSearchRef}>

                {filterSearch.length > 0 && filterSearch.map((product, index) => {


                    return <Link to={`product/${product.title}/${product.id}`} key={index}>
                        <div className='search-product-group'>
                            <div className='search-image-img'>
                                <img src={product.image} alt="" />
                            </div>
                            <div>
                                <div>
                                    {product.title}
                                </div>
                                <div>
                                    ${product.price}
                                </div>
                            </div>
                        </div>
                    </Link>
                })}


            </div>
        </div>
    </div>;
};

export default Modal;
