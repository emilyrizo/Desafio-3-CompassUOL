import BannerShop from "./components/BannerShop";
import FilterMenu from "./components/FilterMenu";
import Footer from "./components/Footer";
import InfoBar from "./components/InfoBar";
import Navbar from "./components/Navbar";
import Products from './components/Products';



const Shop = () => {
  return (
    <div className="home-container">
      <Navbar />
      <BannerShop />
      <FilterMenu />
      <Products/>

      <InfoBar />
      <Footer />        
    </div>
);
};

export default Shop;
