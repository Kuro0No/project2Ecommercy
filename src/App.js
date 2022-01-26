import './App.css';
import BannerVideoHome from './component/Banner/BannerVideoHome';
import Menu from './component/Menu/Menu';
import { Routes, Route } from 'react-router-dom'
import Footer from './component/Footer/Footer';
import Product from './component/Product/Product';
import ProductContextProvide from './component/ProductContext/ProductContext';


function App() {
  return (
    <div className="App">

      <ProductContextProvide >

        <Routes >
          <Route path='/' element={<BannerVideoHome />} />
          <Route path='/product' element={<Product />} />
        </Routes>

        <Footer />
      </ProductContextProvide>
    </div>
  );
}

export default App;
