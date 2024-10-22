import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleProduct from './pages/Product';
import MainComponent from './pages/MainComponent';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/main" element={<MainComponent />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
