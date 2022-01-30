import './App.css';
import BannerVideoHome from './component/Banner/BannerVideoHome';
import Menu from './component/Menu/Menu';
import { Routes, Route } from 'react-router-dom'
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



function App() {
  const { currentUser } = useAuth()

  return (
    <div className="App">

      <ProductContextProvide >
        <CartContextProvider>

          <Routes >
            <Route path='/' element={<BannerVideoHome />} />
            <Route path='/product' element={<Product />} />
            <Route path='/product/:title/:id' element={<ProductDetail />} />
            {/* <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} /> */}
            <Route path='/login' element={currentUser ? <Navigate to='/product' /> : <Login />} />
            <Route path='/product/:title/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />

          </Routes>
        </CartContextProvider>


        <Footer />
      </ProductContextProvide>
    </div>
  );
}

export default App;
