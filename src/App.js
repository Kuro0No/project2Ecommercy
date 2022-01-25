import './App.css';
import BannerVideoHome from './component/Banner/BannerVideoHome';
import Menu from './component/Menu/Menu';
import { Routes, Route } from 'react-router-dom'
import Footer from './component/Footer/Footer';
import Product from './component/Product/Product';
import Header from './component/Header/Header';



function App() {
  return (
    <div className="App">

      <Routes >
        <Route path='/' element={<BannerVideoHome />} />
        
      </Routes>
      <Header />
      <Routes >
        <Route path='/product' element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
