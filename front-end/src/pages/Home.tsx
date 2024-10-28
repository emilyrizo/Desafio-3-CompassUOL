import { useState } from 'react';
import Navbar from "./components/Navbar";
import BannerHome from "./components/BannerHome";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import InfoBar from "./components/InfoBar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const [itemsPerPage] = useState<number>(8);
  const [sortOrder] = useState<string>('Default'); 

  return (
    <div className="home-container">
      <Navbar />
      <BannerHome />
      <Categories />
      <div className="our-products">
        <h1 className="product-title">Our Products</h1>
        <ProductList itemsPerPage={itemsPerPage} currentPage={1} sortOrder={sortOrder} />
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
