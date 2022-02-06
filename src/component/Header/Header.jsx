import './Header.scss'
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Cart/CartContext';
import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { productContext } from '../../ProductContext/ProductContext';
import { dbContext } from '../../DbContext/dbContext';
import { headerContext } from '../HeaderContext/HeaderContext';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { LogoutOutlined, SettingOutlined, UnorderedListOutlined,HomeOutlined,ShopOutlined,ContactsOutlined  } from '@ant-design/icons';




const Header = ({ userCartState }) => {
  const { SubMenu } = Menu;
  const { currentUser, logOut } = useAuth()
  const data = useContext(CartContext)
  const currentUserCart = useContext(dbContext)
  const headerState = useContext(headerContext)
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
          <div><UnorderedListOutlined /></div>
          <div className='tab-menu-dropdown'>
            <div className='tab-dropdown-group'>
              <Link to='/'>
                Home
                <HomeOutlined />
              </Link>
            </div>
            <div className='tab-dropdown-group'>
              <Link to='/product'>
                Products
                <ShopOutlined />
              </Link>
            </div>
            <div className='tab-dropdown-group'>
              <Link to='/contact'>
                Contact
                <ContactsOutlined />
              </Link>
            </div>
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
          <input type="text" placeholder='Search smt....' />
          <div ><i className="bi bi-search"></i></div>
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
                        <i className="bi bi-person"></i>
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
