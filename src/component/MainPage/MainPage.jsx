import { Route, Routes } from "react-router-dom";
import Product from "../Product/Product";
import ProductDetail from "../Product/ProductDetail";
import Header from '../Header/Header'


const MainPage = () => {
    return <>
        <Header />
        <Routes>
            <Route path='/product' element={<Product />} />
            <Route path='/product/:title/:id' element={<ProductDetail />} />
        </Routes>
    </>;
};

export default MainPage;
