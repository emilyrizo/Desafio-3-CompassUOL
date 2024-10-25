import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
// import SingleProduct from './pages/Product';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path='/product/:id' element={<ProductPage />} />
        {/* <Route path="/product/:id" element={<SingleProduct />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
