import './Header.scss'
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Cart/CartContext';
import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { productContext } from '../../ProductContext/ProductContext';

const Header = () => {
  const { currentUser, logOut } = useAuth()
  const data = useContext(CartContext)
  const [currentUserCart, setcurrentUserCart] = useState()

  useEffect(() => {
    async function getdata() {

      const docRef = doc(db, "user",currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // setcurrentUserCart(docSnap.data())
        console.log(docSnap.data() )
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      
    }
    
    
    getdata()
  }, [currentUserCart])

  return (

    <header>
      <div className="container-fluid">
        <div>
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
                    {currentUser ? currentUserCart : data.qty}
                  </span>
                </div>
              </div>
              <div className='textCart'>
                <h5>Cart</h5>
                <span>{data.totalPrice}$</span>
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
