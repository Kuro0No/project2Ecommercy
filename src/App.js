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
import AuthProvider from './AuthContext/AuthContext';


function App() {
  return (
    <div className="App">
      <AuthProvider>

        <ProductContextProvide >

          <Routes >
            <Route path='/' element={<BannerVideoHome />} />
            <Route path='/product' element={<Product />} />
            <Route path='/product/:title/:id' element={<ProductDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

          </Routes>


          <Footer />
        </ProductContextProvide>
      </AuthProvider>
    </div>
  );
}

export default App;
