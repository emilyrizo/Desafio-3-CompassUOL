import Navbar from './components/Navbar';
import MainHome from './components/MainHome';
import Browser from './components/Browser';
import Products from './components/Products';
import InfoBar from './components/InfoBar';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import '../styles/home.css'

const Home = () => {
    return (
        <div className="home-container">
          <Navbar />
          <MainHome />
          <Browser />
          <div className='our-products'>
            <h1 className='product-title'>Our Products</h1>
            <Products />
            <Link className='show-more-products-bt' to="/shop">Show More</Link>
          </div>
          <InfoBar />
          <Footer />        
        </div>
    );
};

export default Home;
