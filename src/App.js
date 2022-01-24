import './App.css';
import BannerVideoHome from './component/Banner/BannerVideoHome';
import Menu from './component/Menu/Menu';
import {Routes, Route} from 'react-router-dom'
import Footer from './component/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Menu  />
     <Routes >
       <Route path='/' element={<BannerVideoHome/>} />
     </Routes>
     <Footer />
    </div>
  );
}

export default App;
