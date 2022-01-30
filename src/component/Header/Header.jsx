import './Header.scss'
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { useState } from 'react';


const Header = () => {
  const { currentUser,logOut } = useAuth()


  return (

    <header>
      <div className="container-fluid">
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <input type="text" />
          <button><i className="bi bi-search"></i></button>
        </div>
        <div className='d-flex header-nav-right header-nav-right'>
          <Link to='/cart' className='linkCart'>

            <div className='d-flex cart-left'>
              <div className=' cart-icon position-relative'>
                <i className="bi bi-cart2 ">
                </i>
                <div className='cart-count'>
                  <span className=''>
                    3
                  </span>
                </div>
              </div>
              <div className='textCart'>
                <h5>Cart</h5>
                <span>185$</span>
              </div>
            </div>
          </Link>
          <div className='d-flex align-items-center'>
            <Link to='/user' className='linkUser'>
              <div className='cart-user'>
                <i className="bi bi-person"></i>
              </div>

            </Link>
            {currentUser ?
              <>

                <div>{currentUser.displayName}</div>
                <button onClick={() => logOut()}>SighOut</button>
              </>
              :
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
