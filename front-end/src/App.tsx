import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleProduct from './pages/Product';
import Shop from './pages/Shop';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


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
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
