import { useState } from 'react';
import Navbar from "./components/Navbar";
import MainHome from "./components/BannerHome";
import Browser from "./components/Browser";
import ProductList from "./components/ProductList";
import InfoBar from "./components/InfoBar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import "../styles/home.css";

  
const Home = () => {
  const [itemsPerPage] = useState<string>('16');
  
  return (
    <div className="home-container">
      <Navbar />
      <MainHome />
      <Browser />
      <div className="our-products">
        <h1 className="product-title">Our Products</h1>
        <ProductList itemsPerPage={itemsPerPage}/>
        <Link className="show-more-products-bt" to="/shop">
          Show More
        </Link>
      </div>
      <InfoBar />
      <Footer />
    </div>
  );
};

export default Home;