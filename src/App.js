import './App.css';
import BannerVideoHome from './component/Banner/BannerVideoHome';
import Menu from './component/Menu/Menu';
import { Routes, Route, useLocation } from 'react-router-dom'
import Footer from './component/Footer/Footer';
import Product from './component/Product/Product';
import ProductContextProvide from './ProductContext/ProductContext';
import ProductDetail from './component/Product/ProductDetail';
import Register from './component/Authentication/Register';
import Login from './component/Authentication/Login';
import { useAuth } from './AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';
import Cart from './component/Cart/Cart';
import CartContextProvider from './component/Cart/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import DbContextProvider from './DbContext/dbContext';
import 'antd/dist/antd.css';
import Header from './component/Header/Header';
import HeaderContextProvider from './component/HeaderContext/HeaderContext';
import Setting from './component/Setting/Setting';
import NotFound from './component/NotFound/NotFound';
import Modal from './component/Modal/Modal';
import { useEffect, useState } from 'react';
import Contact from './component/Contact/Contact';


function App() {
  const { currentUser } = useAuth()
  const location = useLocation()
  const [openActive, setOpenActive] = useState(false)
  const [avatarUser,setAvatarUser]= useState(currentUser?.photoURL)

  return (

    <div className={`App ${openActive ? 'modalOpen' : ''}`}>



      <ToastContainer />
      <ProductContextProvide >
        <CartContextProvider>
          <DbContextProvider>
            <HeaderContextProvider>

              {location.pathname !== '/' && <Header avatarUser={avatarUser}  openActive={openActive} setOpenActive={setOpenActive} />}
              <Routes >
                <Route path='/' element={<BannerVideoHome />} />
                <Route path='/product' element={<Product />} />
                <Route path='/product' element={<Product />} />
                <Route path='/contact' element={<Contact />} />

                <Route path='/login' element={currentUser ? <Navigate to='/product' /> : <Login />} />
                <Route path='/register' element={currentUser ? <Navigate to='/product' /> : <Register />} />
                <Route path='/product/:title/:id' element={<ProductDetail />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/setting' element={currentUser ? <Setting  setAvatarUser={setAvatarUser}/> : <Navigate to='/product' />} />
                <Route path='*' element={<NotFound />} />




              </Routes>
            </HeaderContextProvider>
          </DbContextProvider>
        </CartContextProvider>


        <Footer />
        {location.pathname !== '/' && <Modal openActive={openActive} setOpenActive={setOpenActive} />}
      </ProductContextProvide>
    </div>

  );
}

export default App;
