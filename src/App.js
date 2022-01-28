import './App.css';
import BannerVideoHome from './component/Banner/BannerVideoHome';
import Menu from './component/Menu/Menu';
import { Routes, Route } from 'react-router-dom'
import Footer from './component/Footer/Footer';
import Product from './component/Product/Product';
import ProductContextProvide from './ProductContext/ProductContext';
import ProductDetail from './component/Product/ProductDetail';
import MainPage from './component/MainPage/MainPage';


function App() {
  return (
    <div className="App">

      <ProductContextProvide >

        <Routes >
          <Route path='/' element={<BannerVideoHome />} />
          
        </Routes>
        <MainPage />

        <Footer />
      </ProductContextProvide>
    </div>
  );
}

export default App;
