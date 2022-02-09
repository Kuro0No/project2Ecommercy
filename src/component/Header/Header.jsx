import './Header.scss'
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { CartContext } from '../Cart/CartContext';
import { headerContext } from '../HeaderContext/HeaderContext';
import { Menu, Dropdown, Button, Space } from 'antd';
import { LogoutOutlined, SettingOutlined, UnorderedListOutlined, CloseOutlined } from '@ant-design/icons';
import { productContext } from '../../ProductContext/ProductContext';
import UseDebounce from './UseDebounce';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase';




const Header = ({ setOpenActive, openActive,avatarUser }) => {
  const { SubMenu } = Menu;
  const { currentUser, logOut } = useAuth()
  const data = useContext(CartContext)
  // const currentUserCart = useContext(dbContext) 
  const headerState = useContext(headerContext)

  // productContext //////////////////////////////////////////////////////////////////////
  const { products } = useContext(productContext)

  //Search//////////////////////////////////////////////////////////////////////
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

  // dropdown//////////////////////////////////////////////////////////////////////
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        <Link to='/setting'>
          Setting
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => logOut()} key="2" icon={<LogoutOutlined />}>
        Sign Out
      </Menu.Item>

    </Menu>
  );




  return (

    <header>
      <div className="container-fluid">
        <div className='tabMenu-header'>
          <div onClick={() => setOpenActive(!openActive)} >
            {openActive ? <CloseOutlined /> : <UnorderedListOutlined />}

          </div>

        </div>
        <div className='img-logo-header'>
          <img src={logo} alt="" />
        </div>
        <div className='navLinkHeader'>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/product'>Product</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>

        </div>


        <div className='search-header'>
          <input value={searchTerm} onBlur={blurSearch} onFocus={focusSearch} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder='Search smt....' />
          <div ><i className="bi bi-search"></i></div>

          <div className='field-Search' ref={fielSearchRef}>

            <div> Total result: {filterSearch.length}</div>

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
        <div className='d-flex header-nav-right header-nav-right'>
          <Link to='/cart' className='linkCart'>

            <div className='d-flex cart-left'>
              <div className=' cart-icon position-relative'>
                <i className="bi bi-cart2 ">
                </i>
                <div className='cart-count'>
                  <span className=''>
                    {currentUser ? (headerState ? headerState.headerState.qty : 0) : (data.qty > 0 ? data.qty : 0)}
                  </span>
                </div>
              </div>
              <div className='textCart'>
                <h5>Cart</h5>
                <span>{currentUser ? ((Math.floor(headerState.headerState.totalPrice)) || 0) : (data.totalPrice > 0 ? (Math.floor(data.totalPrice)) : 0)}$</span>
              </div>
            </div>
          </Link>
          <div className='d-flex align-items-center'>

            <div className='linkUser'>
              <div className='cart-user'>

                {currentUser ?
                  <Space wrap>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Button size='large'>
                        <img src={ avatarUser || currentUser?.photoURL ||`https://www.nicepng.com/png/detail/207-2071257_computer-icons-avatar-youtube-download-share-icon-icone.png`} className='avatarUser' alt="" />
                      </Button>
                    </Dropdown>
                  </Space>
                  :
                  <i className="bi bi-person"></i>
                }
              </div>

            </div>


            {!currentUser &&

              <div className='userLink'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </div>}

          </div>
        </div>


      </div>

    </header>


  )
};

export default Header;
